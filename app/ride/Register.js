import React from "react";
import { View, Image, Text, TextInput, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../constants";
import MainButton from "./MainButton";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartLocation() {
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
            source={require("../../assets/Logo_car_sharing_tinder.png")}
          />
          <View style={{ width: "100%", gap: 16 }}>
            <View style={styles.inputs}>
              <TextInput style={styles.input} placeholder="Username" />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
              />
              <TextInput
                style={styles.input}
                inputMode="email"
                placeholder="E-mail"
              />
              <TextInput
                style={styles.input}
                inputMode="tel"
                placeholder="Phone number"
              />
              <TextInput style={styles.input} placeholder="First name" />
              <TextInput style={styles.input} placeholder="Last name" />
            </View>
            <View style={{ width: "100%", gap: 16 }}>
              <MainButton href="ride/Home" content="REGISTER" />
              <View style={styles.buttonTextEnv}>
                <Link href="ride/SignIn" asChild>
                  <Text
                    style={{ color: "#000", fontFamily: FONTS.primaryRegular }}
                  >
                    Already have an account? Sign in!
                  </Text>
                </Link>
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
