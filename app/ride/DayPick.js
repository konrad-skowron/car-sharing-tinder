import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import NavBar from "./NavBar";
import MainButton from "./MainButton";

export default function App() {
  const [days, setDays] = useState([
    { day: "Monday", pressed: false },
    { day: "Tuesday", pressed: false },
    { day: "Wednesday", pressed: false },
    { day: "Thursday", pressed: false },
    { day: "Friday", pressed: false },
    { day: "Saturday", pressed: false },
    { day: "Sunday", pressed: false },
  ]);

  const handleDayPress = (index) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].pressed = !updatedDays[index].pressed;
      return updatedDays;
    });
  };

  return (
    <View style={styles.container}>
      <NavBar prev="ride/LocalizationPick" close="ride/LocalizationPick" />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          gap: 8,
        }}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={day.day}
            style={
              day.pressed ? styles.buttonDayPressed : styles.buttonDayUnpressed
            }
            onPress={() => handleDayPress(index)}
          >
            <Text style={styles.buttonDayText}>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <MainButton href="ride/TimePick" content="Next" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: "auto",
  },
  buttonDayPressed: {
    backgroundColor: "#76ABAE",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDayUnpressed: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDayText: {
    fontSize: 20,
    color: "#000000",
    margin: "auto",
    padding: 10,
    opacity: 0.4,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 50,
    padding: 32,
    backgroundColor: "#eee",
  },
});
