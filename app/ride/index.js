import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

const StartLocation = () => {
  return (
    <View>
      <Link href="ride/Home" asChild>
        <Pressable>
          <Text>Main Screen</Text>
        </Pressable>
      </Link>
      <Link href="ride/LocalizationPick" asChild>
        <Pressable>
          <Text>Wprowadzanie zamówienia</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default StartLocation;
