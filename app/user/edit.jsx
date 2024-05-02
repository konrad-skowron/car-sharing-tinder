import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthProvider";
import MainButton from "../../components/MainButton";
import app from "../../firebaseConfig";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const edit = () => {
  const router = useRouter();
  const { user, isLogged, getUserData, handleLogOut, fetchCurrentUser } =
    useAuthContext();
  const { email, firstName, lastName, phoneNumber, rides, aboutMe } = user;
  const [firstNameText, setFirstNameText] = React.useState(firstName);
  const [lastNameText, setLastNameText] = React.useState(lastName);
  const [phoneNumberText, setPhoneNumberText] = React.useState(phoneNumber);
  const [aboutMeText, setAboutMeText] = React.useState(user.aboutMe);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSetFirstName = (text) => {
    setFirstNameText(text);
  };

  const handleSetLastName = (text) => {
    setLastNameText(text);
  };

  const handleSetPhoneNumber = (text) => {
    setPhoneNumberText(text);
  };

  const handleSetAboutMe = (text) => {
    setAboutMeText(text);
  };

  const handleChangeSave = () => {
    changeData();
  };

  const changeData = async () => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        throw new Error("User does not exist in the database");
      }
      print(firstNameText);
      await updateDoc(userDocRef, {
        firstName: firstNameText,
        aboutMe: aboutMeText,
        lastName: lastNameText,
        phoneNumber: phoneNumberText,
      });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await fetchCurrentUser();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#eee" },
        }}
      />

      <View style={styles.inputWrapper}>
        <Text style={styles.text}>First name</Text>
        <TextInput
          placeholder={email}
          style={styles.input}
          value={firstNameText}
          onChangeText={handleSetFirstName}
        />
        <Text style={styles.text}>Last name</Text>
        <TextInput
          placeholder={firstName}
          style={styles.input}
          value={lastNameText}
          onChangeText={handleSetLastName}
        />
        <Text style={styles.text}>Phone number</Text>
        <TextInput
          placeholder={phoneNumber}
          style={styles.input}
          value={phoneNumberText}
          onChangeText={handleSetPhoneNumber}
        />
        <Text style={styles.text}>About me</Text>
        <TextInput
          style={[styles.input, styles.multilineTextInput]}
          placeholder={aboutMe}
          multiline
          value={aboutMeText}
          onChangeText={handleSetAboutMe}
        />
      </View>
      {!isKeyboardVisible && (
        <MainButton
          href="../../Home"
          content="Confirm"
          onPress={handleChangeSave}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  multilineTextInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 50,
    paddingHorizontal: 32,
    paddingBottom: 32,
    backgroundColor: "#eee",
  },

  title: {
    marginTop: 64,
    fontSize: 42,
    fontFamily: FONTS.secondaryBold,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: "auto",
    gap: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: FONTS.primaryRegular,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: FONTS.primaryRegular,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  itemText: {
    fontSize: 20,
    fontFamily: FONTS.primaryMedium,
  },
  itemSubtext: {
    fontSize: 14,
    fontFamily: FONTS.primaryRegular,
  },
});

export default edit;
