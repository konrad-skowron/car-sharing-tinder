import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

const StartLocation = () => {
  return (
    <View>
      <Text>Start Location</Text>
      <Link href="ride/endLocation" asChild>
        <Pressable>
          <Text>End Location</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default StartLocation;
