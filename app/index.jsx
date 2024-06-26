import React from "react";
import { Redirect } from "expo-router";
import { useAuthContext } from "../context/AuthProvider";

const App = () => {
  const { user } = useAuthContext();
  return user ? <Redirect href="Home" /> : <Redirect href="SignIn" />;
};

export default App;
