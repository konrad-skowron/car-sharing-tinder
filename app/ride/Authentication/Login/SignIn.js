import React from "react";
import { View, Image, Text, TextInput, Button } from "react-native";
import { COLORS, FONTS } from "../../../../constants";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ email,
                                 setEmail,
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
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../../../assets/Logo_car_sharing_tinder.png")}
          />
          <View style={{ width: "100%", gap: 16 }}>
            <View style={styles.inputs}>
              <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  autoCapitalize="none"
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
              <Button onPress={handleAuthentication} title="SIGN IN" />
              <View style={styles.buttonTextEnv}>
                  <Text onPress={() => setIsLogin(false)} style={{ color: "#000", textDecorationLine: "underline", fontFamily: FONTS.primaryRegular }}>
                    Don't have an account? Sign up!
                  </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = {
  inputs: {
    width: "100%",
    justifyContent: "flex-between",
    gap: 4,
  },
  buttonTextEnv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: 32,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  image: {
    width: "80%",
    height: 190,
  },
  Text: {
    fontSize: 20,
    color: COLORS.white,
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
