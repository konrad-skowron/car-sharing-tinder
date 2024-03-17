import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;
