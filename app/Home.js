import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from "react-native";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Link, Stack, useRouter } from "expo-router";
import { COLORS, FONTS } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import RideTile from "../components/RideTile";
import "./index.jsx";

const sampleRides = [
  {
    id: 1,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
  {
    id: 2,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
  {
    id: 3,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
];

const Home = () => {
  const router = useRouter();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const db = getFirestore(app);
      const userRidesRef = collection(db, "users");
      const q = query(userRidesRef, where("rides", "!=", "null"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc, index) => {
        data = doc.data();
        const { firstName, lastName } = data;
        data.rides.forEach((ride) => {
          result.push({ ...ride, firstName, lastName, index });
        });
      });
      setRides(result);
    } catch (error) {
      console.error("Get rides error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#eee" },
          headerLeft: () => (
            <AntDesign
              name="book"
              style={{ marginLeft: 16 }}
              size={28}
              color={COLORS.darkGray}
              onPress={() => {
                // router.navigate("/");
              }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.navigate("./user/About");
              }}
            >
              <Image
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48,
                  marginRight: 16,
                }}
                source={{
                  uri: "https://picsum.photos/200",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.primaryRegular,
            marginBottom: 4,
          }}
        >
          Available:
        </Text>
        <View style={styles.tileContainer}>
          {!rides.length ||
            rides.map((ride, index) => (
              <Link key={index} href={`ride/${ride.index}`} asChild>
                <TouchableOpacity>
                  <RideTile ride={ride} />
                </TouchableOpacity>
              </Link>
            ))}
        </View>
      </View>
      <View style={{ position: "fixed", alignSelf: "flex-end" }}>
        <Link href="ride/new/StartLocationPick" asChild>
          <TouchableOpacity style={styles.plusButton}>
            <AntDesign name="plus" size={24} color="#eee" style={{ padding: 14 }} />
          </TouchableOpacity>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: "#222831",
    borderRadius: 16,
    flexShrink: 1,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 16,
    padding: 32,
    backgroundColor: "#eee",
  },
  tileContainer: {
    display: "flex",
    gap: 8,
  },
  title: {
    marginTop: 64,
    fontSize: 32,
    textAlign: "center",
  },
  navWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 0,
  },
  navButtons: {
    backgroundColor: "#222831",
    borderRadius: 16,
  },
});

export default Home;
