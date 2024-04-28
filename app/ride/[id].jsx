import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import PrevButton from "../../components/PrevButton";
import MainButton from "../../components/MainButton";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import { Stack, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS } from "../../constants";
import { useDataContext } from "../../context/DataProvider";

const days = {
  Monday: "M",
  Tuesday: "Tu",
  Wednesday: "W",
  Thursday: "Th",
  Friday: "F",
  Saturday: "Sa",
  Sunday: "Su",
};

export default function App() {
  const param = useLocalSearchParams();
  const { getRideByUid } = useDataContext();
  const [ride, setRide] = useState({});

  useEffect(() => {
    setRide(getRideByUid(param.id));
  }, []);

  return (
    ride && (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerStyle: { backgroundColor: "#eee" },
          }}
        />
        <View style={styles.row}>
          <View>
            <Text style={styles.nameSurnameText}>
              {ride.firstName} {ride.lastName}
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: 64,
                width: 64,
                borderRadius: 64,
              }}
              source={{
                uri: "https://picsum.photos/200",
              }}
            />
          </View>
        </View>
        <View>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.foontEighteen}>Start location</Text>
              </View>
              {ride.startLocation && (
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.startLocation.address_line1}</Text>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.foontEighteen}>Destination</Text>
              </View>
              {ride.endLocation && (
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.endLocation.address_line1}</Text>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.foontEighteen}>Days</Text>
              </View>
              {ride.days && (
                <View style={styles.days}>
                  {Object.entries(days).map(([k, v]) => (
                    <View key={k} style={ride.days.includes(k) ? styles.buttonDayChoosen : styles.buttonDayUnChoosen}>
                      <Text style={ride.days.includes(k) ? styles.buttonDayTextUnChoosen : styles.buttonDayTextChoosen}>{v}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.foontEighteen}>Hour</Text>
              </View>
              {ride.time && (
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.time}</Text>
                </View>
              )}
            </View>
          </View>
          {ride.carDetails && Object.keys(ride.carDetails).length !== 0 && (
            <View style={styles.column}>
              <Text style={styles.headerForSection}>Car details</Text>
              <View style={styles.row}>
                <View style={styles.center}>
                  <Text style={styles.foontEighteen}>Brand</Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.carDetails.brand}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.center}>
                  <Text style={styles.foontEighteen}>Model</Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.carDetails.model}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.center}>
                  <Text style={styles.foontEighteen}>Color</Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{ride.carDetails.color}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.column}>
            <View>
              <Text style={styles.foontEighteen}>About me</Text>
            </View>
            <View>
              <Text style={styles.headerForSection}>TODO</Text>
            </View>
          </View>
        </View>
        <MainButton href="../../Home" content="Match" />
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  days: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  headerForSection: {
    fontFamily: FONTS.primaryRegular,
    fontSize: 14,
    color: "#999",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  foontEighteen: {
    fontFamily: FONTS.primaryMedium,
    fontSize: 18,
  },
  fontSixteen: {
    fontFamily: FONTS.primaryRegular,
    fontSize: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 8,
  },
  nameSurnameText: {
    fontFamily: FONTS.primaryMedium,
    fontSize: 22,
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 25,
    padding: 32,
    backgroundColor: "#eee",
  },
  textEnv: {
    marginTop: 8,
    marginBottom: "auto",
    // paddingVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  buttonDayChoosen: {
    backgroundColor: "#76ABAE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    width: "10%",
    aspectRatio: 1,
    margin: 1,
  },
  buttonDayUnChoosen: {
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    width: "10%",
    aspectRatio: 1,
    margin: 1,
    borderColor: "#76ABAE",
    borderWidth: 1,
  },
  buttonDayTextUnChoosen: {
    fontFamily: FONTS.primaryMedium,
    color: "#FFFFFF",
  },
  buttonDayTextChoosen: {
    fontFamily: FONTS.primaryMedium,
    color: "#76ABAE",
  },
});
