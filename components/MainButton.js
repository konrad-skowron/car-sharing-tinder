import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FONTS } from "../constants";

const MainButton = ({ href, content, onPress, disabled }) => {
  const buttonContent = (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.buttonEnv}>
      {href ? (
        <Link href={href} asChild>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
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
