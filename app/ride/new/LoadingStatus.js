import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MainButton from "../../../components/MainButton";
import { COLORS, FONTS } from "../../../constants";
import { Stack } from "expo-router";
import { useNewRideContext } from "../../../context/NewRideProvider";

const LoadingStatus = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Waiting...</Text>
      <View style={styles.outer}>
        <View style={styles.inner}>
        <ActivityIndicator size="large" color={COLORS.white} style={styles.loader} />
        </View>
      </View>
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
  loader: {
    transform: [{ scale: 4 }],
  },
});

export default LoadingStatus;
