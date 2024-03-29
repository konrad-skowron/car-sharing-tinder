import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NavBar from "../../Components/NavBar/NavBar";
import MainButton from "../../Components/MainButton/MainButton";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONTS } from "../../../../constants";

export default function App() {
  const router = useRouter();
  const [haveCar, setHaveCar] = useState(false);

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
      {/* <NavBar prev="../TimePick/TimePick" close="../../MainPage/Home/Home" /> */}
      <View style={styles.inputWrapper}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={haveCar ? styles.buttonChecked : styles.buttonUnchecked}
              onPress={() => setHaveCar(!haveCar)}
            >
              <AntDesign
                name="check"
                size={24}
                color="#eee"
                style={{ padding: 14 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 16,
                fontSize: 18,
                fontFamily: FONTS.primaryRegular,
              }}
            >
              Have a car?
            </Text>
          </View>
          {haveCar ? (
            <View style={{ gap: 4 }}>
              <TextInput placeholder="Brand" style={styles.input} />
              <TextInput placeholder="Model" style={styles.input} />
              <TextInput placeholder="Color" style={styles.input} />
              <TextInput
                placeholder="Free seats"
                style={styles.input}
                inputMode="numeric"
              />
              <Text style={styles.text}>Enter the details of your car.</Text>
            </View>
          ) : (
            <Text style={styles.text}>
              Check if you own a car and want to drive.
            </Text>
          )}
        </View>
      </View>
      <MainButton href="../Success/Success" content="Finish" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    // marginBottom: "auto",
    rowGap: 25,
  },
  input: {
    backgroundColor: "#D9D9D9",
    padding: 8,
    fontSize: 19,
    borderRadius: 8,
    marginBottom: 8,
    fontFamily: FONTS.primaryRegular,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 32,
    rowGap: 50,
    backgroundColor: "#eee",
  },
  buttonChecked: {
    backgroundColor: "#76ABAE",
    flexShrink: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonUnchecked: {
    backgroundColor: "#D9D9D9",
    flexShrink: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonDayText: {
    fontSize: 20,
    color: "#000000",
    margin: "auto",
    padding: 10,
    opacity: 0.4,
  },
});
