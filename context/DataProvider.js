import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);

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

  return <DataContext.Provider value={{ users, rides, fetchData, getRideByUid }}>{children}</DataContext.Provider>;
};

export default DataProvider;
