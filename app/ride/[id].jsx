import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MainButton from "../../components/MainButton";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS } from "../../constants";
import { useDataContext } from "../../context/DataProvider";
import { useAuthContext } from "../../context/AuthProvider";
import MapScreen from "../../components/MapScreen";
import DaysPicker from "../../components/daysPicker";

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
  const { user, fetchCurrentUser } = useAuthContext();
  const { getRideByUid, getUserById, addRideToMatched, removeRideFromMatched, deleteRide, loading } = useDataContext();
  const [ride, setRide] = useState({});
  const [matching, setMatching] = useState(false);
  const [showDaysPicker, setShowDaysPicker] = useState(false);
  const [pickedDays, setPickedDays] = useState([]);

  useEffect(() => {
    setRide(getRideByUid(param.id));
  }, []);

  const handleMatchRide = async () => {
    try {
      setMatching(true);
      if (isAlreadyMatched(user.matched, param.id)) {
        await removeRideFromMatched(param.id, user.uid);
      } else {
        await addRideToMatched(param.id, user.uid, pickedDays);
      }
    } catch (error) {
      console.log("Add/Remove ride to/from matched error: ", error.message);
    } finally {
      await fetchCurrentUser();
      setMatching(false);
    }
  };

  const handleDeleteRide = async () => {
    try {
      await deleteRide(param.id);
    } catch (error) {
      console.log("Delete ride error: ", error.message);
    } finally {
      await fetchCurrentUser();
    }
  };

  const isAlreadyMatched = (matched, uid) => {
    return matched.includes(uid);
  };

  const isRideBelongToCurrUser = () => {
    return user.rides.some((rideId) => rideId === param.id);
  };

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
        {Object.keys(ride).length === 0 ? (
          <ActivityIndicator size="large"/>
        ) : (
          <>
            <View style={styles.row}>
              <View>
                <Text style={styles.nameSurnameText}>
                  {ride.user.firstName} {ride.user.lastName}
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
                    uri: ride.user.imageUrl,
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
                  {isAlreadyMatched(user.matched, param.id) ? (
                    ride.days && (
                      <View style={styles.days}>
                        {Object.entries(days).map(([k, v]) => (
                          <View key={k} style={ride.days.some(day => day.day === k && day.passengers.includes(user.uid)) ? styles.buttonDayChoosen : styles.buttonDayUnChoosen}>
                            <Text style={ride.days.some(day => day.day === k && day.passengers.includes(user.uid)) ? styles.buttonDayTextUnChoosen : styles.buttonDayTextChoosen}>{v}</Text>
                          </View>
                        ))}
                      </View>
                    )
                  ) : (
                    ride.days && (
                      <View style={styles.days}>
                        {Object.entries(days).map(([k, v]) => (
                          <View key={k} style={ride.days.some(day => day.day === k && day.active ) ? styles.buttonDayChoosen : styles.buttonDayUnChoosen}>
                            <Text style={ride.days.some(day => day.day === k && day.active ) ? styles.buttonDayTextUnChoosen : styles.buttonDayTextChoosen}>{v}</Text>
                          </View>
                        ))}
                      </View>
                    )
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
                  <Text style={styles.headerForSection}>About me</Text>
                </View>
                <View>
                  <Text style={styles.fontSixteen}>{ride.user.aboutMe}</Text>
                </View>
              </View>
              {/* {isRideBelongToCurrUser() && ride.passengers && (
              <View>
                <Text style={styles.headerForSection}>Passengers</Text>
                {ride.passengers.map((passenger, index) => {
                  const u = getUserById(passenger);
                  return <Text key={passenger} style={styles.fontSixteen}>{`${index + 1}. ${u.firstName} ${u.lastName}`}</Text>;
                })}
              </View>
            )} */}
            </View>
            <MapScreen x1={ride.startLocation.lat} y1={ride.startLocation.lon} x2={ride.endLocation.lat} y2={ride.endLocation.lon} />
          </>
        )}

        {user && isRideBelongToCurrUser() ? (
          <MainButton href="user/matched" content="Delete" onPress={handleDeleteRide} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isAlreadyMatched(user.matched, param.id)) {
                handleMatchRide();
              } else {
                setShowDaysPicker(true);
              }
            }}
          >
            <Text style={styles.buttonText}>{matching ? "Matching..." : isAlreadyMatched(user.matched, param.id) ? "Unmatch" : "Match"}</Text>
          </TouchableOpacity>
        )}
        {ride.days && (
        <DaysPicker
          availableDays={ride.days.filter(d => d.active).map(d => (d.day))}
          isVisible={showDaysPicker}
          onDiscard={() => setShowDaysPicker(false)}
          onConfirm={() => {
            handleMatchRide();
            setShowDaysPicker(false);
          }}
          pickedDays={pickedDays}
          setPickedDays={setPickedDays}
        />)}
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222831",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  buttonText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 20,
    color: "#eee",
    margin: "auto",
    padding: 16,
  },
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
    paddingHorizontal: 32,
    paddingBottom: 32,
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
