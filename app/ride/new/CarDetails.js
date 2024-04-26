import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NavBar from "../../../components/NavBar";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONTS } from "../../../constants";
import { useNewRideContext } from "../../../context/NewRideProvider";

export default function App() {
  const router = useRouter();
  const { setCarDetails, addOffer } = useNewRideContext();
  const [haveCar, setHaveCar] = useState(false);
  const [details, setDetails] = useState({
    brand: "",
    model: "",
    color: "",
    freeSeats: "",
  });

  const handleSaveCarDetails = async () => {
    const detailsToSave = haveCar ? details : {};
    setCarDetails(detailsToSave);
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
        <View style={{ position: "absolute", width: "90%", height: "100%", backgroundColor: COLORS.primary }}></View>
      </View>
      <View style={styles.inputWrapper}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={haveCar ? styles.buttonChecked : styles.buttonUnchecked} onPress={() => setHaveCar(!haveCar)}>
              <AntDesign name="check" size={24} color="#eee" style={{ padding: 14 }} />
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
              <TextInput
                placeholder="Brand"
                style={styles.input}
                value={details.brand}
                onChangeText={(text) =>
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    brand: text,
                  }))
                }
              />
              <TextInput
                placeholder="Model"
                style={styles.input}
                value={details.model}
                onChangeText={(text) =>
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    model: text,
                  }))
                }
              />
              <TextInput
                placeholder="Color"
                style={styles.input}
                value={details.color}
                onChangeText={(text) =>
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    color: text,
                  }))
                }
              />
              <TextInput
                placeholder="Free seats"
                style={styles.input}
                value={details.freeSeats}
                onChangeText={(text) =>
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    freeSeats: text,
                  }))
                }
                keyboardType="numeric"
              />
              <Text style={styles.text}>Enter the details of your car.</Text>
            </View>
          ) : (
            <Text style={styles.text}>Check if you own a car and want to drive.</Text>
          )}
        </View>
      </View>
      <MainButton href="./Success" content="Finish" onPress={handleSaveCarDetails} disabled={Object.values(details).some((value) => value === "") && haveCar} />

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
    paddingHorizontal: 32,
    paddingBottom: 32,
    rowGap: 24,
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
