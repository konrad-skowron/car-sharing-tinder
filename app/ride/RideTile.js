import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../constants";

const RideTile = ({ ride }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.name}
        >{`${ride.user.firstName} ${ride.user.lastName}`}</Text>
        <Text style={styles.car}>{`${capitalizeFirstLetter(ride.car.color)} ${
          ride.car.brand
        } ${ride.car.model}`}</Text>
        <Text
          style={styles.location}
        >{`${ride.startLocation} - ${ride.destination}`}</Text>
      </View>
      <View>
        <Image
          style={{
            height: 56,
            width: 56,
            borderRadius: 56,
            borderWidth: 2,
            borderColor: COLORS.white,
          }}
          source={{
            uri: "https://picsum.photos/200",
          }}
        />
      </View>
    </View>
  );
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  car: {
    color: COLORS.white,
  },
  location: {
    color: COLORS.white,
  },
});

export default RideTile;
