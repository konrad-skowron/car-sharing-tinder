import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthProvider";
import LogoImage from "../../assets/Logo_car_sharing_tinder.png";

const SignUp = () => {
  const { handleSignUp } = useAuthContext();
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const submit = async () => {
    try {
      await handleSignUp(form.email, form.password, form.firstName, form.lastName, form.phoneNumber);
      router.replace("/Home");
    } catch (error) {
      console.error("Sign in error:", error.message);
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient colors={[COLORS.white, COLORS.primary]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {!isKeyboardVisible && <Image style={styles.image} source={LogoImage} />}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={form.firstName} onChangeText={(e) => setForm({ ...form, firstName: e })} placeholder="First name" />
              <TextInput style={styles.input} value={form.lastName} onChangeText={(e) => setForm({ ...form, lastName: e })} placeholder="Last name" />
              <TextInput style={styles.input} value={form.email} onChangeText={(e) => setForm({ ...form, email: e })} placeholder="Email" />
              <TextInput style={styles.input} value={form.phoneNumber} onChangeText={(e) => setForm({ ...form, phoneNumber: e })} placeholder="Phone number" />
              <TextInput
                style={styles.input}
                value={form.password}
                onChangeText={(e) => setForm({ ...form, password: e })}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <View style={{ width: "100%", gap: 16 }}>
              <TouchableOpacity style={styles.button} onPress={() => submit()}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Text
                  onPress={() => router.replace("/SignIn")}
                  style={{
                    color: "#000",
                    textDecorationLine: "underline",
                    fontFamily: FONTS.primaryRegular,
                  }}
                >
                  Already have an account? Sign in!
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    padding: 32,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  image: {
    width: "70%",
    height: 160,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "flex-between",
    gap: 2,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: FONTS.primaryRegular,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 20,
    color: COLORS.white,
    margin: "auto",
    padding: 16,
  },
};

export default SignUp;
