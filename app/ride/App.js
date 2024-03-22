import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/Inter.ttf"),
    Montserrat: require("../../assets/Montserrat.ttf"),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 0, 
          paddingBottom: 50 
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.button}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#eee"
              style={{ padding: "14px" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.button}>
            <AntDesign
              name="close"
              size={24}
              color="#eee"
              style={{ padding: "14px" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput placeholder="Start location" style={styles.input} />
        <Text style={styles.text}>
          Choose the location from which you will travel.
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: "auto",
  },
  input: {
    fontFamily: FONTS.primary,
    backgroundColor: "#D9D9D9",
    padding: "8px",
    fontSize: "19px",
    borderRadius: "8px",
    width: "100%",
  },
  text: {
    marginTop: "16px",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#222831",
    width: "100%",
    borderRadius: "1rem",
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: "19.2px",
    color: "#eee",
    margin: "auto",
    padding: "16px",
  },
  container: {
    flex: 1,
    display: "flex",
    padding: "32px",
    backgroundColor: "#eee",
    alignItems: "center",
  },
});
