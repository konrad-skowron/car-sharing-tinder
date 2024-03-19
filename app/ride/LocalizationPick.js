// import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import NavBar from "./NavBar";
import NextButton from "./NextButton";

export default function App() {

  return (
    <View style={styles.container}>
      <NavBar prev = "ride/LocalizationPick" close = "ride/LocalizationPick"/>
      <View style={styles.inputWrapper}>
        <View>
          <TextInput placeholder="Start location" style={styles.input} />
          <Text style={styles.text}>
            Choose the location from which you will travel.
          </Text>
        </View>
        <View>
          <TextInput placeholder="End location" style={styles.input} />
          <Text style={styles.text}>
            Where are you going?
          </Text>
        </View>
      </View>
      <NextButton text="ride/DayPick" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: "auto",
    rowGap: 15,
  },
  input: {
    backgroundColor: "#D9D9D9",
    padding: 8,
    fontSize: 19,
    borderRadius: 8,
  },
  text: {
     fontSize: 15,
  },
   container: {
     flex: 1,
     display: "flex",
     flexDirection: 'column',
     padding: 32,
     rowGap: 50,
     backgroundColor: "#eee",
   },
});
