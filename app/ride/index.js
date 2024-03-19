import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import MyComponent  from "./App";

const StartLocation = () => {
  return (
    <View>
      
      <Text>Start Location</Text>
      <Link href="ride/endLocation" asChild>
        <Pressable>
          <Text>End Location</Text>
        </Pressable> 
        
      </Link>
      <MyComponent />
    </View>
  );
};

export default StartLocation;