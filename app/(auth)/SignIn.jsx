import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthProvider";

const SignIn = () => {
  const { handleSignIn } = useAuthContext();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });

  const submit = async () => {
    try {
      await handleSignIn(form.email, form.password);
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
          keyboardShouldPersistTaps="handled"
        >
          <Image style={styles.image} source={require("../../assets/Logo_car_sharing_tinder.png")} />
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={form.email} onChangeText={(e) => setForm({ ...form, email: e })} placeholder="Email" autoCapitalize="none" />
              <TextInput style={styles.input} value={form.password} onChangeText={(e) => setForm({ ...form, password: e })} placeholder="Password" secureTextEntry />
            </View>
            <View style={{ width: "100%", gap: 16 }}>
              <TouchableOpacity style={styles.button} onPress={() => submit()}>
                <Text style={styles.buttonText}>SIGN IN</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Text
                  onPress={() => router.replace("/SignUp")}
                  style={{
                    color: "#000",
                    textDecorationLine: "underline",
                    fontFamily: FONTS.primaryRegular,
                  }}
                >
                  Don't have an account? Sign up!
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
    width: "80%",
    height: 190,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "flex-between",
    gap: 4,
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
    display: "flex",
    flexDirection: "column",
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
    color: "#eee",
    margin: "auto",
    padding: 16,
  },
};

export default SignIn;
