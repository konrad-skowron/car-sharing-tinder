import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" />
        <Stack.Screen name="SignUp" />
      </Stack>
    </>
  );
};

export default AuthLayout;
