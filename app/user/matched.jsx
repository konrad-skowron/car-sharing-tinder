import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Link, Stack } from "expo-router";
import React, { useEffect } from "react";
import RideTile from "../../components/RideTile";
import { useDataContext } from "../../context/DataProvider";
import { FONTS } from "../../constants/Fonts";

const matched = () => {
  const { loading, reloadRides, userRides, matchedRides } = useDataContext();

  useEffect(() => {
    reloadRides();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
        {loading ? (
          <ActivityIndicator size="large"/>
        ) : matchedRides.length ? (
          matchedRides.map((ride, index) => (
            <Link key={index} href={`ride/${ride.id}`} asChild>
              <TouchableOpacity>
                <RideTile ride={ride} />
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <Text>No matched rides :(</Text>
        )}
        <View style={styles.tileContainer}></View>
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
        {loading ? (
          <ActivityIndicator size="large"/>
        ) : (
          <View style={styles.tileContainer}>
            {userRides.length ? (
              userRides.map((ride, index) => (
                <Link key={index} href={`ride/${ride.id}`} asChild>
                  <TouchableOpacity>
                    {/* <RideTile ride={{ ...ride, imageUrl: user.imageUrl, aboutMe: user.aboutMe }} /> */}
                    <RideTile ride={ride} />
                  </TouchableOpacity>
                </Link>
              ))
            ) : (
              <Text>You don&apos;t have your own rides :(</Text>
            )}
          </View>
        )}
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
    minHeight: "100vh",
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
