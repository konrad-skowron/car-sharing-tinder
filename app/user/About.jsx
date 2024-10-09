import React, {  useState } from "react";
import { StatusBar } from "expo-status-bar";
import {  FONTS } from "../../constants/Index";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Modal,
} from "react-native";
import MainButton from "../../components/MainButton";
import "../Home";
import "../index";
import { Stack, useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthProvider";


export default function App() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { user, handleLogOut } = useAuthContext();
  const { email, firstName, lastName, phoneNumber, imageUrl, aboutMe } = user;
  return (
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
              uri: imageUrl,
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
          <View>
            <Text style={styles.foontEighteen}>About me</Text>
          </View>
          <View>
            <Text style={styles.headerForSection}>
              {aboutMe}
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
                  <TouchableOpacity
                    onPress={() => {
                      handleLogOut();
                      setModalVisible(false);
                      router.replace("/SignIn");
                    }}
                  >
                    <Text>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Text>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <MainButton href="./edit" content="Edit" />
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
