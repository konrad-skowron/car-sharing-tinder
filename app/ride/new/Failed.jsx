import React from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../../../components/MainButton";
import { COLORS, FONTS } from "../../../constants/Index";
import { Stack } from "expo-router";

const Failed = () => {
 return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Something went wrong :c</Text>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Ionicons name="close-outline" size={128} color={COLORS.white} />
        </View>
      </View>
      <MainButton href="../../Home" content="Home" />
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
    backgroundColor: "red",
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
    backgroundColor: "red",
  },
  title: {
    marginTop: 64,
    fontSize: 42,
    fontFamily: FONTS.secondaryBold,
    textAlign: "center",
  },
});

export default Failed;
