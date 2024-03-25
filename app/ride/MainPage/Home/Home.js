import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import { UserContext } from '../../../UserContext';
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import RideTile from "../../AboutRide/General/RideTile";

const sampleRides = [
  {
    id: 1,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
  {
    id: 2,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
  {
    id: 3,
    user: {
      firstName: "Janusz",
      lastName: "Kowalski",
    },
    car: {
      brand: "Toyota",
      model: "Corolla",
      color: "white",
    },
    startLocation: "Biskupin",
    destination: "Oporów",
  },
];

const Home = () => {
  const { user, getUserData, handleAuthentication } = useContext(UserContext);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getUserData(user.uid).then(data => {
      setUserData(data);
   });
 }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome {userData.firstName}</Text>
        <Button onPress={handleAuthentication} title="Sign out" />
      </View>
      <View style={styles.navWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Link href="" asChild>
            <TouchableOpacity style={styles.navButtons}>
              <AntDesign
                name="book"
                size={24}
                color="#eee"
                style={{ padding: 14 }}
              />
            </TouchableOpacity>
          </Link>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Link href="../../User/AboutUser/AboutUser" state={{ some: "value" }} asChild>
            <TouchableOpacity style={styles.navButtons}>
              <FontAwesome6
                name="face-smile"
                size={24}
                color="#eee"
                style={{ padding: 14 }}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 16, marginBottom: 4 }}>Available:</Text>
        <View style={styles.tileContainer}>
          {sampleRides.map((sampleRide) => (
            <Link key={sampleRide.id} href="../../AboutRide/Detailed/AboutRide" asChild>
              <TouchableOpacity>
                <RideTile ride={sampleRide} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
      <View style={{ position: "fixed", alignSelf: "flex-end" }}>
        <Link href="../../AddingOffer/LocalizationPick/LocalizationPick" asChild>
          <TouchableOpacity style={styles.plusButton}>
            <AntDesign
              name="plus"
              size={24}
              color="#eee"
              style={{ padding: 14 }}
            />
          </TouchableOpacity>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: "#222831",
    borderRadius: 16,
    flexShrink: 1,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 16,
    padding: 32,
    backgroundColor: "#eee",
  },
  tileContainer: {
    display: "flex",
    gap: 8,
  },
  title: {
    marginTop: 64,
    fontSize: 32,
    textAlign: "center",
  },
  navWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 0,
  },
  navButtons: {
    backgroundColor: "#222831",
    borderRadius: 16,
  },
});

export default Home;
