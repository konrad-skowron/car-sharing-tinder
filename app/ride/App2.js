import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";

export default function App() {
  const [days, setDays] = useState([
    { day: "Monday", pressed: false },
    { day: "Tuesday", pressed: false },
    { day: "Wednesday", pressed: false },
    { day: "Thursday", pressed: false },
    { day: "Friday", pressed: false },
    { day: "Saturday", pressed: false },
    { day: "Sunday", pressed: false }
  ]);

  const handleDayPress = (index) => {
    setDays(prevDays => {
      const updatedDays = [...prevDays];
      updatedDays[index].pressed = !updatedDays[index].pressed;
      return updatedDays;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 0,
          paddingBottom: 50
        }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.button}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#eee"
                style={{ padding: 14 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.button}>
              <AntDesign
                name="close"
                size={24}
                color="#eee"
                style={{ padding: 14 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          gap: 20
        }}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={day.day}
              style={day.pressed ? styles.buttonDayPressed : styles.buttonDayUnpressed}
              onPress={() => handleDayPress(index)}
            >
              <Text style={styles.buttonDayText}>{day.day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton}>
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
  buttonDayPressed: {
    backgroundColor: "#76ABAE",
    width: "100%",
    borderRadius: "1rem",
  },
  buttonDayUnpressed: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: "1rem",
  },
  buttonDayText: {
    fontFamily: "Inter",
    fontSize: "20px",
    color: "#000000",
    margin: "auto",
    padding: "16px",
    fontWeight: "bold",
    opacity: 0.4,
  },
  button: {
    backgroundColor: "#222831",
    width: "100%",
    borderRadius: "16px",
  },
  nextButton: {
    backgroundColor: "#222831",
    width: "80%",
    borderRadius: "16px",
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
    justifyContent: "space-between",
  },
});
