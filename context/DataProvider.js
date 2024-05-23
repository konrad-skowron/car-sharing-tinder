import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, documentId } from "firebase/firestore";
import { getCoordinatesRange, isLocationInRange, isLocationinZone } from "../utils";
import { useAuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [availableRides, setAvailableRides] = useState([]);
  const [matchedRides, setMatchedRides] = useState([]);
  const [userRides, setUserRides] = useState([]);
  const { user, isLogged } = useAuthContext();

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

        const ar = await getAvailableRidesForCurrentUser(fetchedUserRides);
        setAvailableRides(ar);

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

  const getAvailableRidesForCurrentUser = async (userRides) => {
    let filteredRideIds = [];
    let resultRides = [];

    for (const ride of userRides) {
      const { days, time, id } = ride;

      const [hours, minutes] = time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);

      for (const day of days) {
        const docSnapBefore = await getDoc(doc(db, day, (timeId - 5).toString()));
        const docSnapCurr = await getDoc(doc(db, day, timeId.toString()));
        const docSnapAfter = await getDoc(doc(db, day, (timeId + 5).toString()));
        let resultRideIds = [];
        if (docSnapBefore.exists() && docSnapCurr.exists() && docSnapAfter.exists()) {
          resultRideIds = [...docSnapBefore.data().rides, ...docSnapCurr.data().rides, ...docSnapAfter.data().rides].filter((rideId) => rideId != id);
          resultRideIds = resultRideIds.filter((rideId) => !user.matched.includes(rideId) && !user.rides.includes(rideId));
        }

        if (resultRideIds.length > 0) {
          filteredRideIds = Array.from(new Set(resultRideIds));
        }
      }
    }

    for (const rid of filteredRideIds) {
      const docSnapRide = await getDoc(doc(db, "rides", rid));
      const ride = docSnapRide.data();

      if (ride) {
        const docSnapUser = await getDoc(doc(db, "users", ride.userId));
        resultRides.push({ id: rid, ...ride, user: docSnapUser.data() });
      }
    }
    let filteredByLocation = [];
    for (const ownRide of userRides) {
      rangeDistance = 0.001;
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
          // resultRides = resultRides.filter((ride) => ride.id !== potentialRide.id);
        }
      }

    
    }
    
  //     const startLocationRange = getCoordinatesRange(startLocation.lat, startLocation.lon, rangeDistance);
  //     const endLocationRange = getCoordinatesRange(endLocation.lat, endLocation.lon, rangeDistance);

  //     const filteredRides = allRides
  //       .filter((ride) => !userData.matched.includes(ride.uid))
  //       .filter(
  //         (ride) =>
  //           ride.carDetails &&
  //           Object.keys(ride.carDetails).length > 0 &&
  //           isLocationInRange(ride.startLocation.lat, ride.startLocation.lon, startLocationRange) &&
  //           isLocationInRange(ride.endLocation.lat, ride.endLocation.lon, endLocationRange)
  //       );
    console.log(resultRides.length);

    //Bez api filtrowanie

    //Z api filtrowanie

    // return resultRides;
    return filteredByLocation;
  };

  const addRideToMatched = async (rideId) => {
    try {
      await updateDoc(doc(db, "rides", rideId), {
        passengers: arrayUnion(user.uid),
      });

      await updateDoc(doc(db, "users", user.uid), {
        matched: arrayUnion(rideId),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeRideFromMatched = async (rideId) => {
    try {
      await updateDoc(doc(db, "rides", rideId), {
        passengers: arrayRemove(user.uid),
      });

      await updateDoc(doc(db, "users", user.uid), {
        matched: arrayRemove(rideId),
      });
    } catch (error) {
      throw new Error("RemoveRideFromMatched: ", error.message);
    }
  };

  const deleteRide = async (rideId) => {
    try {
      const rideToDelete = getRideByUid(rideId);
      const [hours, minutes] = rideToDelete.time.split(":").map(Number);
      const timeId = hours * 60 + minutes - (minutes % 5);

      await deleteDoc(doc(db, "rides", rideId));
      await updateDoc(doc(db, "users", user.uid), {
        rides: arrayRemove(rideId),
      });

      for (const day of rideToDelete.days) {
        await updateDoc(doc(db, day, timeId.toString()), {
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

  //Z API
  // const getAvailableRidesForCurrentUser = async (allRides) => {
  //   const rangeDistance = 0.5;
  //   const result = new Set();
  //   const userData = user;
  //   const locationCheckPromises = userData.rides.map(async (userRide) => {
  //     const { startLocation, endLocation } = userRide;
  //     const startLocationRange = getCoordinatesRange(startLocation.lat, startLocation.lon, rangeDistance);
  //     const endLocationRange = getCoordinatesRange(endLocation.lat, endLocation.lon, rangeDistance);

  //     const filteredRides = allRides.filter((ride) => !userData.matched.includes(ride.uid)).filter((ride) => ride.carDetails && Object.keys(ride.carDetails).length > 0 && isLocationInRange(ride.startLocation.lat, ride.startLocation.lon, startLocationRange) && isLocationInRange(ride.endLocation.lat, ride.endLocation.lon, endLocationRange));
  //     await Promise.all(
  //       filteredRides.map(async (ride) => {
  //         const startLocationCheck = await isLocationinZone(startLocation.lat, startLocation.lon, ride.startLocation.lat, ride.startLocation.lon, rangeDistance);
  //         const endLocationCheck = await isLocationinZone(endLocation.lat, endLocation.lon, ride.endLocation.lat, ride.endLocation.lon, rangeDistance);
  //         if (startLocationCheck && endLocationCheck) {
  //           result.add(ride);
  //         }
  //       })
  //     );
  //   });
  //   await Promise.all(locationCheckPromises);
  //   return Array.from(result);
  // };

  //BEZ API
  // const getAvailableRidesForCurrentUser = (userData, allRides) => {
  //   const rangeDistance = 0.5;
  //   const result = new Set();
  //   userData.rides.forEach((userRide) => {
  //     const { startLocation, endLocation } = userRide;
  //     const startLocationRange = getCoordinatesRange(startLocation.lat, startLocation.lon, rangeDistance);
  //     const endLocationRange = getCoordinatesRange(endLocation.lat, endLocation.lon, rangeDistance);

  //     const filteredRides = allRides
  //       .filter((ride) => !userData.matched.includes(ride.uid))
  //       .filter(
  //         (ride) =>
  //           ride.carDetails &&
  //           Object.keys(ride.carDetails).length > 0 &&
  //           isLocationInRange(ride.startLocation.lat, ride.startLocation.lon, startLocationRange) &&
  //           isLocationInRange(ride.endLocation.lat, ride.endLocation.lon, endLocationRange)
  //       );

  //     filteredRides.forEach(result.add, result);
  //   });

  //   return Array.from(result);
  // };

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
