import NewRideProvider from "../../../context/NewRideProvider";
import { Stack } from "expo-router";

const NewRideLayout = () => {
  return (
    <NewRideProvider>
      <Stack>
        <Stack.Screen name="CarDetails" />
        <Stack.Screen name="DayPick" />
        <Stack.Screen name="EndLocationPick" />
        <Stack.Screen name="StartLocationPick" />
        <Stack.Screen name="TimePick" />
      </Stack>
    </NewRideProvider>
  );
}

export default NewRideLayout;
