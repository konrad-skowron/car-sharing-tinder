import { useState } from "react";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import NavBar from "./NavBar";
import NextButton from "./NextButton";
import Link from "expo-router";
export default function App () {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
 
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
    <View style={styles.container}>
      <NavBar prev="ride/LocalizationPick" close="ride/LocalizationPick" />
      <SafeAreaView>
        <View style={styles.buttonEnv}>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
                <Text style={styles.buttonHourPicker}>{date.getHours()} : {date.getMinutes()}</Text>
            </TouchableOpacity>
            
        </View>
        <View style={styles.textEnv}>
            <Text style={styles.text}>
                Where are you going?
            </Text>
        </View>
        
        {show && (
          <RNDateTimePicker
            textColor="red"
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            display="spinner"
            positiveButton={{label: 'OK', textColor: "#222831"}}
            negativeButton={{label: 'Anuluj', textColor: '#222831'}}
            minuteInterval={5}
          />
        )}
      </SafeAreaView>
      <NextButton text="ride/CarDetails" />
      <StatusBar style="auto" />
    </View>


      
    );
  };


const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: "auto",
  },
  buttonDayPressed: {
    backgroundColor: "#76ABAE",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDayUnpressed: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDayText: {
    fontSize: 20,
    color: "#000000",
    margin: "auto",
    padding: 10,
    opacity: 0.4,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 50,
    padding: 32,
    backgroundColor: "#eee",
  },
  textEnv:{
    marginBottom: "auto",
    // paddingVertical: 5,
  },
  
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
  buttonHourPicker:{
    fontSize: 42,
    color: "#eee",
    margin: "auto",
    padding: 4,
  },
});
