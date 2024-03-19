import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from "expo-router";

const NextButton = ({ text }) => {
  return (
    <View style={styles.buttonEnv}>
        <Link href={text} asChild>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </Link>   
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222831",
    borderRadius: 16,
    width: '90%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonEnv:{
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 19,
    color: "#eee",
    margin: "auto",
    padding: 16,
  },
});

export default NextButton;
