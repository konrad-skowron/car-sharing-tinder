import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import PrevButton from "../../Components/PrevButton/PrevButton";
import MainButton from "../../Components/MainButton/MainButton";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { COLORS, FONTS } from "../../../../constants";

const sampleUser = {
  user: {
    firstName: "Jan",
    lastName: "Kowalski",
    aboutMe: "Bad driver from Wroclaw",
  },
  car: {
    brand: "Toyota",
    model: "Corolla",
    color: "white",
    seats: 5,
  },
  advert: {
    startLocation: "Biskupin",
    destination: "Oporów",
    time: "12:00",
    days: [
      { day: "M", pressed: false },
      { day: "Tu", pressed: true },
      { day: "W", pressed: false },
      { day: "Th", pressed: true },
      { day: "F", pressed: true },
      { day: "Sa", pressed: false },
      { day: "Su", pressed: false },
    ],
  },
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>text:{ride}</Text> */}
      {/* <PrevButton prev="../../MainPage/Home/Home" /> */}
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
            {sampleUser.user.firstName} {sampleUser.user.lastName}
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
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>
                {sampleUser.advert.startLocation}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Destination</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>
                {sampleUser.advert.destination}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Days</Text>
            </View>
            <View style={styles.days}>
              {/*TODO*/}
              {sampleUser.advert.days.map((day, index) => (
                <View
                  key={index}
                  style={
                    day.pressed
                      ? styles.buttonDayChoosen
                      : styles.buttonDayUnChoosen
                  }
                >
                  <Text
                    style={
                      day.pressed
                        ? styles.buttonDayTextUnChoosen
                        : styles.buttonDayTextChoosen
                    }
                  >
                    {day.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Hour</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{sampleUser.advert.time}</Text>
            </View>
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.headerForSection}>Car details</Text>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Brand</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{sampleUser.car.brand}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Model</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{sampleUser.car.model}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Color</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{sampleUser.car.color}</Text>
            </View>
          </View>
        </View>
        <View style={styles.column}>
          <View>
            <Text style={styles.foontEighteen}>About me</Text>
          </View>
          <View>
            <Text style={styles.headerForSection}>
              {sampleUser.user.aboutMe}
            </Text>
          </View>
        </View>
      </View>
      <MainButton href="../../MainPage/Home/Home" content="Match" />
      <StatusBar style="auto" />
    </SafeAreaView>
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
