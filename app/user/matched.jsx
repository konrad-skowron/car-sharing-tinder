import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Link, Stack, useRouter, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import app from "../../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { COLORS, FONTS } from "../../constants";
import RideTile from "../../components/RideTile";
import { useAuthContext } from "../../context/AuthProvider";

const matched = () => {
  const router = useRouter();
  const [rides, setRides] = useState([]);
  const { user } = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      getRides();
    }, [])
  );

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
    <View>
      <ScrollView style={styles.container}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerStyle: { backgroundColor: "#eee" },
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.primaryRegular,
            marginBottom: 4,
          }}
        >
          Matched:
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
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.primaryRegular,
            marginBottom: 4,
            marginTop: 8,
          }}
        >
          Own:
        </Text>
        <View style={styles.tileContainer}>
          {!user.rides.length ||
            user.rides.map((ride, index) => (
              <Link key={index} href={`ride/${ride.index}`} asChild>
                <TouchableOpacity>
                  <RideTile ride={ride} />
                </TouchableOpacity>
              </Link>
            ))}
        </View>
        <Text style={{ height: 24 }}></Text>
      </ScrollView>
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
    paddingHorizontal: 24,
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

export default matched;
