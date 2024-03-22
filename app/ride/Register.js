import React from "react";
import { View, Image, Text, TextInput } from "react-native";
import { COLORS } from "../../constants";
import MainButton from "./MainButton";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartLocation() {
  return (
    <SafeAreaView>
    <LinearGradient
            colors={['#EEE', '#ADCACB','#76ABAE']}
            style={styles.button}>
    <View style={styles.container}>
        <Image style={styles.Image} source={require('../../assets/Logo_car_sharing_tinder.png')} />
        <View style={styles.inputs}>
            <TextInput
                style={styles.input}
                value={"Username"}
            />
            <TextInput
                style={styles.input}
                value={"Password"}
            />
            <TextInput
                style={styles.input}
                value={"E - mail"}
            />
            <TextInput
                style={styles.input}
                value={"Phone number"}
            />
            
            <TextInput
                style={styles.input}
                value={"Name"}
            />
            <TextInput
                style={styles.input}
                value={"Surname"}
            />
        </View>
        <View style={{width: "100%"}}>
            <MainButton href="ride/Home" content="Register" />
            <View style={styles.buttonTextEnv}>
                <Link href="ride/SignIn" asChild>
                    <Text style={{color: "#000"}}>Already have an account? Log in!</Text>
                </Link>
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextEnv: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  
        alignItems: "center",
    },
    container:{
        height: "100%",
        padding: 32,
        paddingVertical: 20,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    
    Image: {
        width: "80%",
        height: 190,

    },
    Text: {
        fontSize: 20,
        color: COLORS.white,
    },
    input: {
        width: "100%",
        borderWidth: 2,
        padding: 10,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 10,
        fontSize: 20,
      },
};
