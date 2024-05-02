import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthProvider";
import MainButton from "../../components/MainButton";
import app from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { set } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {storage} from "../../firebaseConfig";



const edit = () => {
  const router = useRouter();
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const { user, isLogged, getUserData, handleLogOut, fetchCurrentUser } =
    useAuthContext();
  const { email, firstName, lastName, phoneNumber, rides, aboutMe } = user;
  const [firstNameText, setFirstNameText] = React.useState(firstName);
  const [lastNameText, setLastNameText] = React.useState(lastName);
  const [phoneNumberText, setPhoneNumberText] = React.useState(phoneNumber);
  const [aboutMeText, setAboutMeText] = React.useState(user.aboutMe);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitImage = async () => {
    const storageRef = ref(storage, 'images/' + image);
    console.log(storageRef);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).catch((error) => {
      console.error('Error uploading a blob or file:', error);
    });
  };
    

  const uploadImage = async () => {
    setUploading(true);
    try{
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
          resolve(xhr.response);
        };
        xhr.onerror = function(e){
          console.error(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = ref().child(`images/${filename}`);

      await ref.put(blob);
      setUploading(false);
      Alert.alert("Success", "Image uploaded successfully");
      setImage(null);
    }catch(error){
      console.error(error);
      setUploading(false);
    }
  };

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
    submitImage();
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
      
      <View>
      <View style={{gap: 8}}>
        <Text style={styles.text}>Profile picture</Text>
        <View style={{justifyContent:"center", alignItems: "center"}}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
          ) : (
           
              <Text style={styles.text}>No profile picture, click to pick one!</Text>
            
          )}
          </TouchableOpacity>
        </View>
      </View>
      
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

  container2:{
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
