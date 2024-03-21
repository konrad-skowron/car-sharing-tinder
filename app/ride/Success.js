import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "./MainButton";
import { COLORS, FONTS } from "../../constants";

const Success = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success!</Text>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Ionicons name="checkmark-outline" size={128} color={COLORS.white} />
        </View>
      </View>
      <MainButton href="" content="Home" />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 50,
    padding: 32,
    backgroundColor: "#eee",
  },
  outer: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 256,
    height: 256,
    borderRadius: 256,
    backgroundColor: COLORS.primary,
  },
  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 208,
    height: 208,
    borderRadius: 208,
    borderWidth: 5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  title: {
    marginTop: 64,
    fontSize: 32,
    textAlign: "center",
  },
});

export default Success;
