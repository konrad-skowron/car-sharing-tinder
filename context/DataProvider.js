import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getCoordinatesRange, isLocationInRange } from "../utils";
import { useAuthContext } from "./AuthProvider";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const { user } = useAuthContext();
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
      querySnapshot.forEach((doc) => {
        usersResult.push(doc.data());
      });
      setUsers(usersResult);

      const ridesResult = await getRidesFromUsers(usersResult);
      setRides(ridesResult);

      const availableRidesResult = await getAvailableRidesForCurrentUser(ridesResult);
      console.log(availableRidesResult);
      setAvailableRides(availableRidesResult);

      return usersResult;
    } catch (error) {
      console.error("Fetch data error: ", error.message);
    }
  };

  const getRidesFromUsers = async (data) => {
    const result = [];
    if (data) {
      data.forEach((user, index) => {
        const { firstName, lastName } = user;
        user.rides
          .filter((ride) => ride.uid)
          .forEach((ride) => {
            result.push({ ...ride, firstName, lastName });
          });
      });
    }
    return result;
  };

  const getRideByUid = (uid) => {
    return rides.filter((ride) => ride.uid == uid)[0];
  };

  const getAvailableRidesForCurrentUser = async (allRides) => {
    const rangeDistance = 0.5;
    const result = new Set();

    user.rides.forEach((userRide) => {
      console.log("user ride: ", userRide);
      const { startLocation, endLocation } = userRide;
      const startLocationRange = getCoordinatesRange(startLocation.lat, startLocation.lon, rangeDistance);
      const endLocationRange = getCoordinatesRange(endLocation.lat, endLocation.lon, rangeDistance);
      const filteredRides = allRides.filter((ride) => {
        return isLocationInRange(ride.startLocation.lat, ride.startLocation.lon, startLocationRange) && isLocationInRange(ride.endLocation.lat, ride.endLocation.lon, endLocationRange);
      });
      result.add(...filteredRides);
    });
    return result;
  };

  return <DataContext.Provider value={{ users, rides, availableRides, fetchData, getRideByUid }}>{children}</DataContext.Provider>;
};

export default DataProvider;
