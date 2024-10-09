import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS } from "../../../constants";
import { Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import MainButton from "../../../components/MainButton";
import { useNewRideContext } from "../../../context/NewRideProvider";

export default function TimePick() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { setTime } = useNewRideContext();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleSaveTime = () => {
    setTime(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`);
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
      <View style={{ borderColor: COLORS.darkGray, borderWidth: 1.5, borderRadius: 3, height: 12, width: "100%", position: "relative", overflow: "hidden" }}>
        <View style={{ position: "absolute", width: "70%", height: "100%", backgroundColor: COLORS.primary }}></View>
      </View>
      <SafeAreaView>
        <View style={styles.buttonEnv}>
          <TouchableOpacity style={styles.button} onPress={showTimepicker}>
            <Text style={styles.buttonHourPicker}>
              {date.getHours().toString().padStart(2, "0")} : {date.getMinutes().toString().padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textEnv}>
          <Text style={styles.text}>What time are you leaving?</Text>
        </View>

        {show && (
          <RNDateTimePicker
            textColor="red"
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            display="spinner"
            positiveButton={{ label: "OK", textColor: "#222831" }}
            negativeButton={{ label: "Anuluj", textColor: "#222831" }}
            minuteInterval={5}
          />
        )}
      </SafeAreaView>
      <MainButton href="./CarDetails" content="Next" onPress={handleSaveTime} />
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
    paddingHorizontal: 32,
    paddingBottom: 32,
    rowGap: 24,
    backgroundColor: "#eee",
  },
  textEnv: {
    marginTop: 8,
    marginBottom: "auto",
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },

  button: {
    backgroundColor: "#D9D9D9",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnv: {
    alignItems: "center",
    marginTop: "auto",
  },
  buttonHourPicker: {
    fontSize: 42,
    color: COLORS.darkGray,
    fontFamily: FONTS.primaryRegular,
    margin: "auto",
    padding: 4,
  },
});
