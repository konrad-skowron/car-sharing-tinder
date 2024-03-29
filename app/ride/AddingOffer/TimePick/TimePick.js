import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS } from "../../../../constants";
import { Link, Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import NavBar from "../../Components/NavBar/NavBar";
import MainButton from "../../Components/MainButton/MainButton";

export default function App() {
  const router = useRouter();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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
      <SafeAreaView>
        <View style={styles.buttonEnv}>
          <TouchableOpacity style={styles.button} onPress={showTimepicker}>
            <Text style={styles.buttonHourPicker}>
              {date.getHours()} : {date.getMinutes()}
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
      <MainButton
        href="ride/AddingOffer/CarDetails/CarDetails"
        content="Next"
      />
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
  textEnv: {
    marginTop: 8,
    marginBottom: "auto",
    // paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },

  button: {
    // backgroundColor: "#222831",
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
