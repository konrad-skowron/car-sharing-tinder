import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getCoordinatesRange, isLocationInRange } from "../utils";
import { useAuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const { user, getCurrentUser, getUserData } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [availableRides, setAvailableRides] = useState([]);

  const fetchData = async () => {
    try {
      const db = getFirestore(app);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("rides", "!=", "null"));
      const querySnapshot = await getDocs(q);
      const usersResult = [];
      const user = await getCurrentUser();
      querySnapshot.forEach((doc) => {
        if (doc.id != user.uid) {
          usersResult.push(doc.data());
        }
      });
      setUsers(usersResult);

      const ridesResult = await getRidesFromUsers(usersResult);
      setRides(ridesResult);

      const availableRidesResult = await getAvailableRidesForCurrentUser(
        ridesResult
      );
      setAvailableRides(availableRidesResult);

      return usersResult;
    } catch (error) {
      console.error("Fetch data error: ", error.message);
    }
  };

  const getRidesFromUsers = async (data) => {
    const result = [];
    if (data) {
      data.forEach((userRecord, index) => {
        const { firstName, lastName } = userRecord;
        userRecord.rides
          .filter((ride) => ride.uid)
          .forEach((ride) => {
            result.push({ ...ride, firstName, lastName });
          });
      });
    }
    return result;
  };

  const getMatchedRides = () => {
    return rides.filter((ride) => user.matched.includes(ride.uid));
  };

  const getRideByUid = (uid) => {
    const allRides = [...rides, ...user.rides];
    return allRides.filter((ride) => ride.uid == uid)[0];
  };

  const getAvailableRidesForCurrentUser = async (allRides) => {
    const rangeDistance = 0.5;
    const result = new Set();
    const user = await getCurrentUser();
    const userData = await getUserData(user.uid);
    userData.rides.forEach((userRide) => {
      const { startLocation, endLocation } = userRide;
      const startLocationRange = getCoordinatesRange(
        startLocation.lat,
        startLocation.lon,
        rangeDistance
      );
      const endLocationRange = getCoordinatesRange(
        endLocation.lat,
        endLocation.lon,
        rangeDistance
      );

      const filteredRides = allRides
        .filter((ride) => !userData.matched.includes(ride.uid))
        .filter(
          (ride) =>
            ride.carDetails &&
            Object.keys(ride.carDetails).length > 0 &&
            isLocationInRange(
              ride.startLocation.lat,
              ride.startLocation.lon,
              startLocationRange
            ) &&
            isLocationInRange(
              ride.endLocation.lat,
              ride.endLocation.lon,
              endLocationRange
            )
        );

      filteredRides.forEach(result.add, result);
    });

    return Array.from(result);
  };

  return (
    <DataContext.Provider
      value={{
        users,
        rides,
        availableRides,
        fetchData,
        getRideByUid,
        getMatchedRides,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
