import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getCoordinatesRange, isLocationInRange, isLocationinZone } from "../utils";
import { useAuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const db = getFirestore(app);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRides, setAllRides] = useState([]);
  const [availableRides, setAvailableRides] = useState([]);
  const [matchedRides, setMatchedRides] = useState([]);
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
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("rides", "!=", "null"));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.id != user.uid) {
            users.push({ id: doc.id, ...doc.data() });
          }
        });
        setUsers(users);

        const ar = extractRidesFromUsers(users);
        setAllRides(ar);

        //Z API
        // const aa = await getAvailableRidesForCurrentUser(ar);

        //BEZ API
        const aa = getAvailableRidesForCurrentUser(user, ar);
        setAvailableRides(aa);

        const am = getMatchedRides(ar);
        setMatchedRides(am);

        setLoading(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const extractRidesFromUsers = (users) => {
    const result = [];
    users.forEach((user, index) => {
      const { id, firstName, lastName } = user;
      user.rides
        .filter((ride) => ride.uid)
        .forEach((ride) => {
          result.push({ ...ride, firstName, lastName, userId: id });
        });
    });

    return result;
  };

  const addRideToMatched = async (uid) => {
    try {
      const passengerUserDocRef = doc(db, "users", user.uid);
      const ownerUserDocRef = doc(db, "users", getRideByUid(uid).userId);
      const passengerUserSnapshot = await getDoc(passengerUserDocRef);
      const ownerUserSnapshot = await getDoc(ownerUserDocRef);

      const rides = ownerUserSnapshot.data().rides;
      const index = rides.findIndex((ride) => ride.uid === uid);
      const rideToReplace = rides[index];
      if (!rideToReplace.passengers) {
        rideToReplace.passengers = new Array();
      }
      rideToReplace.passengers.push(user.uid);
      rides[index] = rideToReplace;

      if (!passengerUserSnapshot.exists() || !ownerUserSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }
      await updateDoc(passengerUserDocRef, {
        matched: arrayUnion(uid),
      });
      await updateDoc(ownerUserDocRef, {
        rides: rides,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeRideFromMatched = async (uid) => {
    try {
      const passengerUserDocRef = doc(db, "users", user.uid);
      const ownerUserDocRef = doc(db, "users", getRideByUid(uid).userId);
      const passengerUserSnapshot = await getDoc(passengerUserDocRef);
      const ownerUserSnapshot = await getDoc(ownerUserDocRef);

      const rides = ownerUserSnapshot.data().rides;
      const index = rides.findIndex((ride) => ride.uid === uid);
      const rideToReplace = rides[index];
      rideToReplace.passengers = rideToReplace.passengers.filter((passenger) => passenger !== user.uid);
      rides[index] = rideToReplace;

      if (!passengerUserSnapshot.exists() || !ownerUserSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }
      await updateDoc(passengerUserDocRef, {
        matched: arrayRemove(uid),
      });

      await updateDoc(ownerUserDocRef, {
        rides: rides,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteRide = async (rideToDelete) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }
      await updateDoc(userDocRef, {
        rides: arrayRemove(rideToDelete),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMatchedRides = (allRides) => {
    return allRides.filter((ride) => user.matched.includes(ride.uid));
  };

  const getRideByUid = (uid) => {
    const ar = [...allRides, ...user.rides];
    return ar.filter((ride) => ride.uid == uid)[0];
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
  const getAvailableRidesForCurrentUser = (userData, allRides) => {
    const rangeDistance = 0.5;
    const result = new Set();
    userData.rides.forEach((userRide) => {
      const { startLocation, endLocation } = userRide;
      const startLocationRange = getCoordinatesRange(startLocation.lat, startLocation.lon, rangeDistance);
      const endLocationRange = getCoordinatesRange(endLocation.lat, endLocation.lon, rangeDistance);

      const filteredRides = allRides.filter((ride) => !userData.matched.includes(ride.uid)).filter((ride) => ride.carDetails && Object.keys(ride.carDetails).length > 0 && isLocationInRange(ride.startLocation.lat, ride.startLocation.lon, startLocationRange) && isLocationInRange(ride.endLocation.lat, ride.endLocation.lon, endLocationRange));

      filteredRides.forEach(result.add, result);
    });

    return Array.from(result);
  };

  return (
    <DataContext.Provider
      value={{
        allRides,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
