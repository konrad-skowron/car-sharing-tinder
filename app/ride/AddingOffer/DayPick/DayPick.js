import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../../constants";
import { Link, Stack, useRouter } from "expo-router";
import MainButton from "../../Components/MainButton/MainButton";

export default function App() {
  const router = useRouter();
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
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#eee" },
          headerRight: () => (
            <AntDesign
              name="close"
              size={24}
              color={COLORS.darkGray}
              onPress={() => {
                router.navigate("/");
              }}
            />
          ),
        }}
      />
      {/* <NavBar prev="ride/LocalizationPick" close="ride/LocalizationPick" /> */}
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
            <Text
              style={
                day.pressed
                  ? styles.buttonDayTextPressed
                  : styles.buttonDayTextUnPressed
              }
            >
              {day.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.text}>Choose which days you will travel.</Text>
      <MainButton href="../TimePick/TimePick" content="Next" />
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
  buttonDayTextUnPressed: {
    fontSize: 20,
    fontFamily: FONTS.primaryRegular,
    color: "#000000",
    margin: "auto",
    padding: 10,
    opacity: 0.6,
  },
  buttonDayTextPressed: {
    fontSize: 20,
    fontFamily: FONTS.primaryRegular,
    color: "#FFFFFF",
    margin: "auto",
    padding: 10,
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 16,
    padding: 32,
    backgroundColor: "#eee",
  },
});
