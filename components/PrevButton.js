import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";
import { Link } from "expo-router";

const PrevButton = ({ prev}) => {
  return (
    <View style={styles.test}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Link href={prev} asChild>
        <TouchableOpacity style={styles.navButtons}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#eee"
            style={{ padding: 14 }}
          />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
  );
};

export default PrevButton;

const styles = StyleSheet.create({ 
    test:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 0, 
    },
     navButtons:{
       backgroundColor: "#222831",
       borderRadius: 16,
     }
  });
  
