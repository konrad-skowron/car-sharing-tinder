import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthContext } from "../context/AuthProvider";

const NewRideContext = createContext();
export const useNewRideContext = () => useContext(NewRideContext);

const NewRideProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [startLocation, setStartLocation] = useState({
    address_line1: "",
    address_line2: "",
    street: "",
    postcode: "",
    city: "",
    lat: "",
    lon: "",
  });

  const [endLocation, setEndLocation] = useState({
    startLocation: {
      address_line1: "",
      address_line2: "",
      street: "",
      postcode: "",
      city: "",
      lat: "",
      lon: "",
    },
  });

  const [days, setDays] = useState([]);

  const [time, setTime] = useState(null);

  const [carDetails, setCarDetails] = useState({
    car: {
      brand: "",
      model: "",
      color: "",
      seats: 0,
    },
  });

  useEffect(()=>{console.log(startLocation)}, [startLocation]);
  useEffect(()=>{console.log(endLocation)}, [endLocation]);
  useEffect(()=>{console.log(days)}, [days]);
  useEffect(()=>{console.log(time)}, [time]);
  useEffect(()=>{console.log(carDetails)}, [carDetails]);

  const addOffer = async () => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);

      console.log(user.uid);
  
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }
  
      const newOffer = {
        startLocation,
        endLocation,
        days,
        time,
        carDetails,
      };
  
      await updateDoc(userDocRef, {
        rides: arrayUnion(newOffer)
      });
    } catch (error) {
        throw new Error(error.message);
    }
  };

  return <NewRideContext.Provider value={{ setStartLocation, setEndLocation, setDays, setTime, setCarDetails, addOffer }}>{children}</NewRideContext.Provider>;
};

export default NewRideProvider;
