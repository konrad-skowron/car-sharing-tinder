import React from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../constants/Index";
import { Stack, useRouter } from "expo-router";
import MainButton from "../../../components/MainButton";
import { useNewRideContext } from "../../../context/NewRideProvider";

export default function App() {
  const { setDays } = useNewRideContext();
  const router = useRouter();
  const [daysD, setDaysD] = useState([
    { day: "Monday", pressed: false },
    { day: "Tuesday", pressed: false },
    { day: "Wednesday", pressed: false },
    { day: "Thursday", pressed: false },
    { day: "Friday", pressed: false },
    { day: "Saturday", pressed: false },
    { day: "Sunday", pressed: false },
  ]);

  useEffect(() => {
    setDays(daysD.filter((day) => day.pressed).map((day) => ({ day: day.day, active: true, full: false })));
  }, [daysD]);

  const handleDayPress = (index) => {
    setDaysD((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].pressed = !updatedDays[index].pressed;
      return updatedDays;
    });
  };

  const isAnyDaySelected = daysD.some((day) => day.pressed);

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
      <View style={{ borderColor: COLORS.darkGray, borderWidth: 1.5, borderRadius: 3, height: 12, width: "100%", position: "relative", overflow: "hidden" }}>
        <View style={{ position: "absolute", width: "50%", height: "100%", backgroundColor: COLORS.primary }}></View>
      </View>
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
        {daysD.map((day, index) => (
          <TouchableOpacity key={day.day} style={day.pressed ? styles.buttonDayPressed : styles.buttonDayUnpressed} onPress={() => handleDayPress(index)}>
            <Text style={day.pressed ? styles.buttonDayTextPressed : styles.buttonDayTextUnPressed}>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.text}>Choose which days you will travel.</Text>
      <MainButton href="./TimePick" content="Next" disabled={!isAnyDaySelected} />
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
    paddingHorizontal: 32,
    paddingBottom: 32,
    rowGap: 12,
    backgroundColor: "#eee",
  },
});
