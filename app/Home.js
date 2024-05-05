import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import app from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Link, Stack, useRouter, useFocusEffect } from "expo-router";
import { COLORS, FONTS } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import RideTile from "../components/RideTile";
import "./index.jsx";
import { useDataContext } from "../context/DataProvider.js";
import { useAuthContext } from "../context/AuthProvider";

const Home = () => {
  const router = useRouter();
  const { loading, reloadRides, allRides, availableRides } = useDataContext();
  const { user } = useAuthContext();

  useEffect(() => {
    reloadRides();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 24 }}>
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
                  router.navigate("/user/matched");
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
                    uri: "https://via.placeholder.com/150",
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.primaryRegular,
            marginBottom: 4,
          }}
        >
          Available:
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.tileContainer}>
            {availableRides.length ? (
              availableRides.map((ride, index) => (
                <Link key={index} href={`ride/${ride.uid}`} asChild>
                  <TouchableOpacity>
                    <RideTile ride={ride} />
                  </TouchableOpacity>
                </Link>
              ))
            ) : (
              <Text>No rides available for you :(</Text>
            )}
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          alignSelf: "flex-end",
        }}
      >
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
    marginBottom: "auto",
    flex: 1,
    backgroundColor: "#eee",
  },
  tileContainer: {
    paddingBottom: 24,
    gap: 8,
  },
  title: {
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
