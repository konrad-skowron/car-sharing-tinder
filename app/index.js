import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "gray" },
          headerShadowVisible: false,
          headerRight: () => <Text>Profile</Text>,
        }}
      />
      <ScrollView>
        <View>
          <Text>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
