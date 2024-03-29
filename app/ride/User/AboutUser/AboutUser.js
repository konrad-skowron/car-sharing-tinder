import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS } from "../../../../constants";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Button,
  Modal,
} from "react-native";
import PrevButton from "../../Components/PrevButton/PrevButton";
import MainButton from "../../Components/MainButton/MainButton";
import "../../MainPage/Home/Home";
import "../../../index";
import { Link, Stack } from "expo-router";

const sampleUser = {
  user: {
    firstName: "Jan",
    lastName: "Kowalski",
    // email: "jan.kowalski@email.com",
    phoneNumber: "123456789",
    aboutMe: "Bad driver from Wroclaw",
  },
  car: {
    brand: "Toyota",
    model: "Corolla",
    color: "white",
    seats: 5,
  },
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#eee" },
        }}
      />
      {/* <PrevButton prev="ride/MainPage/Home/Home" /> */}
      <View style={styles.row}>
        <View>
          <Text style={styles.nameSurnameText}>
            {firstName} {lastName}
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
              <Text style={styles.foontEighteen}>E-mail</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.foontEighteen}>Phone</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.fontSixteen}>{phoneNumber}</Text>
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
            <Text style={styles.headerForSection}>
              {sampleUser.user.aboutMe}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.logOut}>Log out</Text>
        </TouchableOpacity>
        {/* <View>
          <Link href="../../../index" asChild>
            <TouchableOpacity>
              <Text style={styles.logOut}>Log out</Text>
            </TouchableOpacity>  
          </Link>
        </View> */}

        <View style={styles.modalBand}>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            hardwareAccelerated={true}
            presentationStyle="overFullScreen"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text>Do you really want to logout?</Text>
                <View style={styles.buttonContainer}>
                  <Link href="../../../" asChild>
                    <TouchableOpacity
                      onPress={() => {
                        handleAuthentication();
                        setModalVisible(false);
                      }}
                    >
                      <View>
                        <Text>Yes</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <View>
                      <Text>No</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <MainButton href="" content="Edit" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  modalBand: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Półprzezroczyste tło
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    rowGap: 20,
    alignItems: "center",
  },
  // { flex: 1, justifyContent: 'center', alignItems: 'center', width:'50%', height:'50%'}
  logOut: {
    color: "red",
    fontFamily: FONTS.primaryMedium,
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
    paddingVertical: 12,
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
});
