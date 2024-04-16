import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FONTS } from "../constants";

const MainButton = ({ href, content }) => {
  return (
    <View style={styles.buttonEnv}>
      <Link href={href} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{content}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222831",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnv: {
    alignItems: "center",
    marginTop: "auto",
  },
  buttonText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 20,
    color: "#eee",
    margin: "auto",
    padding: 16,
  },
});

export default MainButton;
