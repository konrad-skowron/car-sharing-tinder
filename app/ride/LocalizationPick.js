import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import NavBar from "./NavBar";
import MainButton from "./MainButton";

export default function App() {
  const router = useRouter();

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
                router.navigate("ride/Home");
              }}
            />
          ),
        }}
      />
      {/* <NavBar prev="ride/LocalizationPick" close="ride/LocalizationPick" /> */}
      <View style={styles.inputWrapper}>
        <View>
          <TextInput placeholder="Start location" style={styles.input} />
          <Text style={styles.text}>
            Choose the location from which you will travel.
          </Text>
        </View>
        <View>
          <TextInput placeholder="Destination" style={styles.input} />
          <Text style={styles.text}>Where are you going?</Text>
        </View>
      </View>
      <MainButton href="ride/DayPick" content="Next" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: "auto",
    rowGap: 16,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: FONTS.primaryRegular,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 32,
    rowGap: 32,
    backgroundColor: "#eee",
  },
});
