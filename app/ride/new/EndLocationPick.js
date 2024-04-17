import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, FlatList, Pressable } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../constants";
import fetchLocations from "../../../utils";
import MainButton from "../../../components/MainButton";
import { useNewRideContext } from "../../../context/NewRideProvider";

export default function EndLocationPick() {
  const router = useRouter();
  const [endLocationText, setEndLocationText] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState(null);
  const { setEndLocation } = useNewRideContext();
  
  // const [data, setData] = useState([]);

  //TO NA TESTA, ŻEBY NIE WYSŁAĆ CO CHWILĘ REQUESTÓW
  const [data, setData] = useState([
    {
      address_line1: "C-15",
      address_line2: "Zygmunta Janiszewskiego 11a, 50-372 Wrocław, Poland",
      street: "Wrocław",
      housenumber: "11a",
      postcode: "50-372",
      city: "Wrocław",
      resultType: "city",
      lat: 51.108739549999996,
      lon: 17.05950472421074,
    },
    {
      address_line1: "Zygmunta Janiszewskiego",
      address_line2: "50-374 Wrocław, Poland",
      street: "Wrocław",
      postcode: "50-374",
      city: "Wrocław",
      resultType: "street",
      lat: 51.1093752,
      lon: 17.0605391,
    },
  ]);

  const handleFetchData = () => {
    fetchLocations(endLocationText).then((data) => setData(data));
  };

  const handleEndLocationChange = (text) => {
    setEndLocationText(text);
  };

  const handleSelectedEndLocation = (text) => {
    setSelectedEndLocation(text);
    setEndLocationText(text.address_line1);
  }

  const handleSaveEndLocation = () => {
    setEndLocation(selectedEndLocation);
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
      <View style={styles.inputWrapper}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
            <TextInput placeholder="Destination" style={styles.input} value={endLocationText} onChangeText={handleEndLocationChange} onSubmitEditing={handleFetchData} />
            <TouchableOpacity onPress={handleFetchData} style={{ backgroundColor: "#D9D9D9", paddingVertical: 7.6, paddingHorizontal: 6, justifyContent: "center", borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {data.length ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Pressable key={index} style={styles.item}
                onPress={() => handleSelectedEndLocation({ address_line1: item.address_line1, address_line2: item.address_line2, street: item.street, postcode: item.postcode, city: item.city, lat: item.lat, lon: item.lon })}>
                  {item.resultType === "city" ? <FontAwesome6 name="city" size={24} color={COLORS.darkGray} /> : <FontAwesome6 name="location-dot" size={24} color={COLORS.darkGray} />}

                  <View>
                    <Text style={styles.itemText}>{item.address_line1}</Text>
                    <Text style={styles.itemSubtext}>{item.address_line2}</Text>
                  </View>
                </Pressable>
              )}
            />
          ) : (
            <Text style={styles.text}>Where are you going?</Text>
          )}
        </View>
      </View>
      <MainButton href="./DayPick" content="Next" onPress={handleSaveEndLocation}/>
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
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: FONTS.primaryRegular,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  itemText: {
    fontSize: 20,
    fontFamily: FONTS.primaryMedium,
  },
  itemSubtext: {
    fontSize: 14,
    fontFamily: FONTS.primaryRegular,
  },
});
