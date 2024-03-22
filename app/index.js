import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import SignIn from "./ride/SignIn";
const App = () => {
  return (
    <SignIn />

    // <SafeAreaView>
    //   <Stack.Screen
    //     options={{
    //       headerTitle: "",
    //       headerStyle: { backgroundColor: "gray" },
    //       headerShadowVisible: false,
    //       headerRight: () => <Text>Profile</Text>,
    //     }}
    //   />
    //   <ScrollView>
    //     <View>
    //       <Link href="ride" asChild>
    //         <Pressable>
    //           <Text>Create ride</Text>
    //         </Pressable>
    //       </Link>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default App;
