import React, { useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../../constants";
import MainButton from "../../Components/MainButton/MainButton";

export default function App() {
  const router = useRouter();
  const [startLocation, setStartLocation] = useState("");

  const closeDropdownList = () => {
    var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
    containerElement.removeChild(autocompleteItemsElement);
    }

    focusedItemIndex = -1;
}

  const handleStartLocationChange = (text) => {
    setStartLocation(text);
    var currentValue = text;
    if(currentValue.length <= 3) return;
    var promise = new Promise((resolve, reject) => {
        currentPromiseReject = reject;
        var apiKey = "aacfa879748e45b291751d430282f092";
        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&limit=1&apiKey=${apiKey}`;
        
        // if (options.type) {
        //     url += `&type=${options.type}`;
        // }

        fetch(url)
            .then(response => {
            if (response.ok) {
                response.json().then(data => resolve(data));
            } else {
                response.json().then(data => reject(data));
            }
            });
        });

        promise.then((data) => {
        currentItems = data.features;
        console.log(data.features[0].bbox[1], data.features[0].bbox[0]);
        console.log(data.features[0].properties.address_line1, data.features[0].properties.address_line2, 
            data.features[0].properties.city);       
        }, (err) => {
        if (!err.canceled) {
            console.log(err);
        }
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
      <View style={styles.inputWrapper}>
        <View>
          <TextInput
            placeholder="Start location"
            style={styles.input}
            value={startLocation}
            onChangeText={handleStartLocationChange}
          />
          <Text style={styles.text}>
            Choose the location from which you will travel.
          </Text>
        </View>
        <View>
          <TextInput placeholder="Destination" style={styles.input} />
          <Text style={styles.text}>Where are you going?</Text>
        </View>
      </View>
      <MainButton href="../DayPick/DayPick" content="Next" />
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
