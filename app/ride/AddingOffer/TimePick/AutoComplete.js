import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, FlatList, Pressable } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../../constants";
import MainButton from "../../Components/MainButton/MainButton";

export default function App() {
  const router = useRouter();
  const [startLocation, setStartLocation] = useState("");
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
    fetchData();
  };

  const fetchData = () => {
    if (startLocation.length <= 3) return;
    var promise = new Promise((resolve, reject) => {
      currentPromiseReject = reject;
      var apiKey = "aacfa879748e45b291751d430282f092";
      var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(startLocation)}&limit=3&apiKey=${apiKey}`;

      // if (options.type) {
      //     url += `&type=${options.type}`;
      // }

      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((data) => resolve(data));
        } else {
          response.json().then((data) => reject(data));
        }
      });
    });

    promise.then(
      (data) => {
        currentItems = data.features;
        console.log(currentItems);
        setData(
          currentItems.map((feature) => {
            return {
              address_line1: feature.properties.address_line1,
              address_line2: feature.properties.address_line2,
              street: feature.properties.city,
              housenumber: feature.properties.housenumber,
              postcode: feature.properties.postcode,
              city: feature.properties.city,
              resultType: feature.properties.result_type,
              lat: feature.properties.lat,
              lon: feature.properties.lon,
            };
          })
        );
      },
      (err) => {
        if (!err.canceled) {
          console.log(err);
        }
      }
    );
  };

  const handleStartLocationChange = (text) => {
    setStartLocation(text);
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
            <TextInput placeholder="Start location" style={styles.input} value={startLocation} onChangeText={handleStartLocationChange} />
            <TouchableOpacity onPress={handleFetchData} style={{ backgroundColor: "#D9D9D9", paddingVertical: 7.6, paddingHorizontal: 6, justifyContent: "center", borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {data.length ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Pressable key={index} style={styles.item}>
                  {item.resultType === "city" ? <FontAwesome6 name="city" size={24} color={COLORS.darkGray} /> : <FontAwesome6 name="location-dot" size={24} color={COLORS.darkGray} />}

                  <View>
                    <Text style={styles.itemText}>{item.address_line1}</Text>
                    <Text style={styles.itemSubtext}>{item.address_line2}</Text>
                  </View>
                </Pressable>
              )}
            />
          ) : (
            <Text style={styles.text}>Choose the location from which you will travel.</Text>
          )}
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
