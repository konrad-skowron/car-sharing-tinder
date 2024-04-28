import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthProvider";

const edit = () => {
  const { user, isLogged, getUserData, handleLogOut } = useAuthContext();
  const { email, firstName, lastName, phoneNumber, rides } = user;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>{email}</Text>
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
      <Text>{phoneNumber}</Text>
      

      <Text>Tu będzie about me</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 50,
    padding: 32,
    backgroundColor: "#eee",
  },
  outer: {
    marginTop: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 256,
    height: 256,
    borderRadius: 256,
    backgroundColor: COLORS.primary,
  },
  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 208,
    height: 208,
    borderRadius: 208,
    borderWidth: 5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  title: {
    marginTop: 64,
    fontSize: 42,
    fontFamily: FONTS.secondaryBold,
    textAlign: "center",
  },
});

export default edit;
