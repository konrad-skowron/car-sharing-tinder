import React, { createContext, useContext, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, addDoc, setDoc, collection } from "firebase/firestore";
import { useAuthContext } from "../context/AuthProvider";

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
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);

      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }

      let newOffer = {
        userId: user.uid,
        startLocation,
        endLocation,
        days: days.map(day => ({
          ...day,
          passengers: new Array()})),
        time,
        carDetails,
      };

      const res = await addDoc(collection(db, "rides"), newOffer);
      await updateDoc(userDocRef, {
        rides: arrayUnion(res.id),
      });

      insertRideId(res.id, newOffer.days, newOffer.time);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const insertRideId = (rideId, days, time) => {
    const db = getFirestore(app);
    const [hours, minutes] = time.split(":").map(Number);
    const timeId = hours * 60 + minutes - (minutes % 5);

    days.forEach(async (dayObject) => {
      const dayDocRef = doc(db, dayObject.day, timeId.toString());

      await updateDoc(dayDocRef, {
        rides: arrayUnion(rideId),
      });
    });
  };

  return <NewRideContext.Provider value={{ setStartLocation, setEndLocation, setDays, setTime, setCarDetails, addOffer }}>{children}</NewRideContext.Provider>;
};

export default NewRideProvider;
