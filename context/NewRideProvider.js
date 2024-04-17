import React, { createContext, useContext, useEffect, useState } from "react";

const NewRideContext = createContext();
export const useNewRideContext = () => useContext(NewRideContext);

const NewRideProvider = ({ children }) => {
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

  return <NewRideContext.Provider value={{ setStartLocation, setEndLocation, setDays, setTime, setCarDetails }}>{children}</NewRideContext.Provider>;
};

export default NewRideProvider;
