import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, documentId } from "firebase/firestore";
import { getCoordinatesRange, isLocationInRange, isLocationinZone } from "../utils/Index";
import { useAuthContext } from "./AuthProvider";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [availableRides, setAvailableRides] = useState([]);
  const [matchedRides, setMatchedRides] = useState([]);
  const [userRides, setUserRides] = useState([]);
  const {user, isLogged } = useAuthContext();
  const [users ] = useState([]);

  useEffect(() => {
    if (isLogged) {
      reloadRides();
    }
  }, [isLogged]);

  const reloadRides = async () => {
    if (isLogged) {
      try {
        setLoading(true);
        const db = getFirestore(app);

        if (user.rides.length === 0) {
          return;
        }

        const ridesRef = collection(db, "rides");
        const qRides = query(ridesRef, where(documentId(), "in", user.rides));
        const queryRidesSnapshot = await getDocs(qRides);

        const fetchedUserRides = [];
        queryRidesSnapshot.forEach((doc) => {
          fetchedUserRides.push({ id: doc.id, ...doc.data(), user: user });
        });
        setUserRides(fetchedUserRides);
        const rangeDistance = 0.5;
        const ar = await getAvailableRidesForCurrentUser(fetchedUserRides, rangeDistance);
        setAvailableRides(ar.filteredByLocation);

        const getBetterRides = async () => {
            const betterRides = await getAvaibleRidesByAcurateLocation(ar.pairs, rangeDistance);
            if (betterRides) {
                setAvailableRides(betterRides);
            }
        };
        getBetterRides();
       

        const mr = await getMatchedRides(user.matched);
        setMatchedRides(mr);

        setLoading(false);
      } catch (error) {
        console.error("ReloadRides: ", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getAvaibleRidesByAcurateLocation = async (pairRides, rangeDistance) => {
    let acurateRides = [];
    for(const ride of pairRides) {
      const [ownRide, potentialRide] = ride;
      const ownStartLocation = ownRide.startLocation;
      const ownEndLocation = ownRide.endLocation;
      const potentialStartLocation = potentialRide.startLocation;
      const potentialEndLocation = potentialRide.endLocation;
      const startLocationCheck = await isLocationinZone(ownStartLocation.lat, ownStartLocation.lon, 
        potentialStartLocation.lat, potentialStartLocation.lon, rangeDistance);
       const endLocationCheck = await isLocationinZone(ownEndLocation.lat, ownEndLocation.lon,
         potentialEndLocation.lat, potentialEndLocation.lon, rangeDistance);
      if (startLocationCheck && endLocationCheck ) {
        acurateRides.push(potentialRide);
      };      
    }
    
    return acurateRides;

  };
  
  const getAvailableRidesForCurrentUser = async (userRides, rangeDistance) => {
    let filteredRideIds = [];
    let resultRides = [];

    for (const ride of userRides) {
      const { days, time, id } = ride;

      const [hours, minutes] = time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);

      for (const dayObject of days) {
        const docSnapBefore = await getDoc(doc(db, dayObject.day, Math.max(0, timeId - 5).toString()));
        const docSnapCurr = await getDoc(doc(db, dayObject.day, timeId.toString()));
        const docSnapAfter = await getDoc(doc(db, dayObject.day, Math.min(1435, timeId + 5).toString()));
        let resultRideIds = [];
        if (docSnapBefore.exists() && docSnapCurr.exists() && docSnapAfter.exists()) {
          resultRideIds = [...docSnapBefore.data().rides, ...docSnapCurr.data().rides, ...docSnapAfter.data().rides].filter((rideId) => rideId != id);
          resultRideIds = resultRideIds.filter((rideId) => !user.matched.includes(rideId) && !user.rides.includes(rideId));
        }
        
        if (resultRideIds.length > 0) {
          filteredRideIds = [...Array.from(new Set(resultRideIds)), ...filteredRideIds];
        }
      }
    }
    
    filteredRideIds = Array.from(new Set(filteredRideIds))
    for (const rid of filteredRideIds) {
      const docSnapRide = await getDoc(doc(db, "rides", rid));
      const ride = docSnapRide.data();

      if (ride) {
        const docSnapUser = await getDoc(doc(db, "users", ride.userId));
        resultRides.push({ id: rid, ...ride, user: docSnapUser.data() });
      }
    }

    resultRides = resultRides.filter(obj => {
      return obj.days.some(day => day.active === true && day.full === false);
    });

    let filteredByLocation = [];
    let pairs = [];
    for (const ownRide of userRides) {
      const startLocationRange = getCoordinatesRange(ownRide.startLocation.lat, ownRide.startLocation.lon, rangeDistance);
      const endLocationRange = getCoordinatesRange(ownRide.endLocation.lat, ownRide.endLocation.lon, rangeDistance);
      for (const potentialRide of resultRides) {
        if (
          potentialRide.carDetails && Object.keys(potentialRide.carDetails).length > 0 
          && filteredByLocation.includes(potentialRide) == false 
          && isLocationInRange(potentialRide.startLocation.lat, potentialRide.startLocation.lon, startLocationRange) 
          && isLocationInRange(potentialRide.endLocation.lat, potentialRide.endLocation.lon, endLocationRange)
        ) {
          filteredByLocation.push(potentialRide);
          const pair = [ownRide, potentialRide];
          pairs.push(pair);
        }
      }
    }

    const lists = {
      filteredByLocation,
      pairs
    }

    return lists;
  };

  const addRideToMatched = async (rideId, newPassengerId, pickedDays) => {
    try {
      const docRef = doc(db, 'rides', rideId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('No such document!');
        return;
      }
  
      const data = docSnap.data();
      const days = data.days;

      const time = data.time;

      const [hours, minutes] = time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);

      let filteredRideIdsToDeactivation = [];
      for (const dayObject of days) {
        const docSnapBefore = await getDoc(doc(db, dayObject.day, Math.max(0, timeId - 5).toString()));
        const docSnapCurr = await getDoc(doc(db, dayObject.day, timeId.toString()));
        const docSnapAfter = await getDoc(doc(db, dayObject.day, Math.min(1435, timeId + 5).toString()));
        let resultRideIds = [];
        if (docSnapBefore.exists() && docSnapCurr.exists() && docSnapAfter.exists()) {
          resultRideIds = [...docSnapBefore.data().rides, ...docSnapCurr.data().rides, ...docSnapAfter.data().rides].filter((rId) => rId != rideId);
          resultRideIds = resultRideIds.filter((rId) => user.rides.includes(rId));
        }
        
        if (resultRideIds.length > 0) {
          filteredRideIdsToDeactivation = [...Array.from(new Set(resultRideIds)), ...filteredRideIdsToDeactivation];
        }
      }

      filteredRideIdsToDeactivation = Array.from(new Set(filteredRideIdsToDeactivation))

      for (const rideId of filteredRideIdsToDeactivation) {
        const insideDocRef = doc(db, 'rides', rideId);
        const insideDocSnap = await getDoc(insideDocRef);

        const deactiveDays = insideDocSnap.data().days.map(day => {
          if (pickedDays.includes(day.day)){
            day.active = false;
            return {
              ...day
            };
          }
          return day;
        })

        await updateDoc(insideDocRef, { days: deactiveDays });
        console.log('Deactivate!');
      }
  
      const updatedDays = days.map(day => {
        if (pickedDays.includes(day.day)) {

          const isFull = parseInt(day.passengers.length + 1) >= parseInt(data.carDetails.freeSeats);

          if (isFull) {
            day.full = true;
          }

          return {
            ...day,
            passengers: [...day.passengers, newPassengerId]
          };
        }
        return day;
      });
  
      await updateDoc(docRef, { days: updatedDays });
      console.log('Passenger added successfully!');

      await updateDoc(doc(db, "users", user.uid), {
        matched: arrayUnion(rideId),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeRideFromMatched = async (rideId, newPassengerId) => {
    try {
      const docRef = doc(db, 'rides', rideId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('No such document!');
        return;
      }
  
      const data = docSnap.data();
      const days = data.days;

      const userDays = [];
      days.forEach(day => {
        if (day.passengers.includes(newPassengerId) && !userDays.includes(day.day)) {
          userDays.push(day.day);
        }
      });

      const time = data.time;

      const [hours, minutes] = time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);

      let filteredRideIdsToActivation = [];
      for (const dayObject of days) {
        const docSnapBefore = await getDoc(doc(db, dayObject.day, Math.max(0, timeId - 5).toString()));
        const docSnapCurr = await getDoc(doc(db, dayObject.day, timeId.toString()));
        const docSnapAfter = await getDoc(doc(db, dayObject.day, Math.min(1435, timeId + 5).toString()));
        let resultRideIds = [];
        if (docSnapBefore.exists() && docSnapCurr.exists() && docSnapAfter.exists()) {
          resultRideIds = [...docSnapBefore.data().rides, ...docSnapCurr.data().rides, ...docSnapAfter.data().rides].filter((rId) => rId != rideId);
          resultRideIds = resultRideIds.filter((rId) => user.rides.includes(rId));
        }
        
        if (resultRideIds.length > 0) {
          filteredRideIdsToActivation = [...Array.from(new Set(resultRideIds)), ...filteredRideIdsToActivation];
        }
      }

      filteredRideIdsToActivation = Array.from(new Set(filteredRideIdsToActivation))

      for (const rideId of filteredRideIdsToActivation) {
        const insideDocRef = doc(db, 'rides', rideId);
        const insideDocSnap = await getDoc(insideDocRef);

        const deactiveDays = insideDocSnap.data().days.map(day => {
          if (userDays.includes(day.day)){
            day.active = true;
            return {
              ...day
            };
          }
          return day;
        })

        await updateDoc(insideDocRef, { days: deactiveDays });
        console.log('Activate!');
      }
  
      const updatedDays = days.map(day => {

        const isNotFull = parseInt(day.passengers.length - 1) <= parseInt(data.carDetails.freeSeats);

        if (isNotFull) {
          day.full = false;
        }

          return {
            ...day,
            passengers: day.passengers.filter(p => p !== newPassengerId)
          };
      });
  
      await updateDoc(docRef, { days: updatedDays });
      console.log('Passenger removed successfully!');

      await updateDoc(doc(db, "users", user.uid), {
        matched: arrayRemove(rideId),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteRide = async (rideId) => {
    try {
      const rideToDelete = getRideByUid(rideId);
      const [hours, minutes] = rideToDelete.time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);
  
      for (const day of rideToDelete.days) {
        for (const passenger of day.passengers) {

          const userDays = [];
          rideToDelete.days.forEach(day => {
            if (day.passengers.includes(passenger) && !userDays.includes(day.day)) {
              userDays.push(day.day);
            }
          });

          const docSnapUser = await getDoc(doc(db, "users", passenger));
          const userToActivate = docSnapUser.data();
  
          let filteredRideIdsToActivation = [];
          for (const dayObject of rideToDelete.days) {
            const docSnapBefore = await getDoc(doc(db, dayObject.day, Math.max(0, timeId - 5).toString()));
            const docSnapCurr = await getDoc(doc(db, dayObject.day, timeId.toString()));
            const docSnapAfter = await getDoc(doc(db, dayObject.day, Math.min(1435, timeId + 5).toString()));
            let resultRideIds = [];
            if (docSnapBefore.exists() && docSnapCurr.exists() && docSnapAfter.exists()) {
              resultRideIds = [...docSnapBefore.data().rides, ...docSnapCurr.data().rides, ...docSnapAfter.data().rides].filter((rId) => rId != rideId);
              resultRideIds = resultRideIds.filter((rId) => userToActivate.rides.includes(rId));
            }
  
            if (resultRideIds.length > 0) {
              filteredRideIdsToActivation = [...Array.from(new Set(resultRideIds)), ...filteredRideIdsToActivation];
            }
          }
  
          filteredRideIdsToActivation = Array.from(new Set(filteredRideIdsToActivation))
  
          for (const rideId of filteredRideIdsToActivation) {
            const insideDocRef = doc(db, 'rides', rideId);
            const insideDocSnap = await getDoc(insideDocRef);
  
            const deactiveDays = insideDocSnap.data().days.map(day => {
              if (userDays.includes(day.day)) {
                day.active = true;
                return {
                  ...day
                };
              }
              return day;
            })
  
            await updateDoc(insideDocRef, { days: deactiveDays });
            console.log('Activate!');
          }
        }
      }
  
      await deleteDoc(doc(db, "rides", rideId));
      await updateDoc(doc(db, "users", user.uid), {
        rides: arrayRemove(rideId),
      });
  
      for (const dayObject of rideToDelete.days) {
        await updateDoc(doc(db, dayObject.day, timeId.toString()), {
          rides: arrayRemove(rideId),
        });
      }
  
      if (rideToDelete.passengers) {
        for (const userId of rideToDelete.passengers) {
          const docSnapUser = await getDoc(doc(db, "users", userId));
          const userData = docSnapUser.data();
  
          if (userData?.matched?.includes(rideId)) {
            await updateDoc(doc(db, "users", userId), {
              matched: arrayRemove(rideId),
            });
          }
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMatchedRides = async (matchedRideIds) => {
    const resultRides = [];
    for (const matchedRideId of matchedRideIds) {
      const docSnapRide = await getDoc(doc(db, "rides", matchedRideId));
      const ride = docSnapRide.data();

      if (ride) {
        const docSnapUser = await getDoc(doc(db, "users", ride.userId));
        resultRides.push({ id: matchedRideId, ...ride, user: docSnapUser.data() });
      }
    }
    return resultRides;
  };

  const getRideByUid = (rideId) => {
    return [...userRides, ...availableRides, ...matchedRides].filter((ride) => ride.id == rideId)[0];
  };

  const getUserById = (id) => {
    return users.filter((user) => user.id === id)[0];
  };

  return (
    <DataContext.Provider
      value={{
        availableRides,
        reloadRides,
        getRideByUid,
        getUserById,
        matchedRides,
        getMatchedRides,
        loading,
        addRideToMatched,
        removeRideFromMatched,
        deleteRide,
        userRides,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
