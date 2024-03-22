import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants";
import {StyleSheet, View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Button,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import PrevButton from "./PrevButton";
import MainButton from "./MainButton";
import Link from "expo-router";
import { collectManifestSchemes } from "expo-linking";

const sampleUser = {
  user: {
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@email.com",
    phoneNumber: "123456789",
    aboutMe: "Bad driver from Wroclaw"
  },
  car:{
    brand: "Toyota",
    model: "Corolla",
    color: "white",
    seats: 5
  },
  }
  



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PrevButton prev="ride/Home" />
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
              borderWidth: 2,
              borderColor: COLORS.white,
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
              <Text style={styles.foontEighteen}>E-mail</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{sampleUser.user.email}</Text>
            </View>
          </View>
          <View style={styles.row}>
                <View style={styles.center}>
                  <Text style={styles.foontEighteen}>Phone</Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{sampleUser.user.phoneNumber}</Text>
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
          <View style={styles.row}>
                <View style={styles.center}>
                  <Text style={styles.foontEighteen}>Seats</Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.fontSixteen}>{sampleUser.car.seats}</Text>
                </View>
          </View>
        </View>
        <View style={styles.column}>
              <View>
                <Text style={styles.foontEighteen}>About me</Text>
              </View>
              <View>
              <Text style={styles.headerForSection}>{sampleUser.user.aboutMe}</Text>
              </View>
        </View>
      </View>
      <MainButton href="ride/Home" content="Edit" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerForSection: {
    fontSize: 12,
    color: "#999",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  foontEighteen: {
    fontSize: 18,
  },
  fontSixteen: {
    fontSize: 16,
  },
  row:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  column:{
    display: "flex",
    flexDirection: "column",
    paddingVertical: 12,
  },
  nameSurnameText:{
    fontSize: 24,
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
});
