import React, { createContext, useContext, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthContext } from "../context/AuthProvider";
import * as Crypto from 'expo-crypto';

const NewRideContext = createContext();
export const useNewRideContext = () => useContext(NewRideContext);

const NewRideProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [startLocation, setStartLocation] = useState({});

  const [endLocation, setEndLocation] = useState({});

  const [days, setDays] = useState([]);

  const [time, setTime] = useState(null);

  const [carDetails, setCarDetails] = useState({});

  const addOffer = async () => {
    try {
      const offerUid = Crypto.randomUUID();
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);
      
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }

      const newOffer = {
        uid: offerUid,
        startLocation,
        endLocation,
        days,
        time,
        carDetails,
      };

      await updateDoc(userDocRef, {
        rides: arrayUnion(newOffer),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return <NewRideContext.Provider value={{ setStartLocation, setEndLocation, setDays, setTime, setCarDetails, addOffer }}>{children}</NewRideContext.Provider>;
};

export default NewRideProvider;
