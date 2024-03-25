import React from "react";
import { View, Image, Text, TextInput, ScrollView, Button } from "react-native";
import { COLORS, FONTS } from "../../../../constants";
import MainButton from "../../Components/MainButton/MainButton";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp({ firstName,
                                 setFirstName,
                                 lastName,
                                 setLastName,
                                 email,
                                 setEmail,
                                 phoneNumber,
                                 setPhoneNumber,
                                 password,
                                 setPassword,
                                 setIsLogin,
                                 handleAuthentication }) {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#EEE", "#ADCACB", "#76ABAE"]}
        style={styles.button}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/Logo_car_sharing_tinder.png")}
          />
          <View style={{ width: "100%", gap: 16 }}>
            <View style={styles.inputs}>
              <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
              />
              <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last name"
              />
              <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
              />
              <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone number"
              />
              <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
              />
            </View>
            <View style={{ width: "100%", gap: 16 }}>
              <Button onPress={handleAuthentication} title="SIGN UP" />
              <View style={styles.buttonTextEnv}>
                <Text onPress={() => setIsLogin(true)} style={{ color: "#000", textDecorationLine: "underline", fontFamily: FONTS.primaryRegular }}>
                  Already have an account? Sign in!
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = {
  inputs: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonTextEnv: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    height: "100%",
    padding: 32,
    borderRadius: 8,
    width: "100%",
  },
  image: {
    width: 150,
    height: 120,
    marginTop: 40,
    marginBottom: 80,
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
};
