import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS } from "../constants";

const RideTile = ({ ride }) => {
  return (
    <View style={styles.container}>
      <View style={{ maxWidth: "75%" }}>
        <Text style={styles.name}>{`${ride.firstName} ${ride.lastName}`}</Text>
        {Object.keys(ride.carDetails).length && ride.carDetails != null ? <Text style={styles.car}>{`${capitalizeFirstLetter(ride.carDetails.color)} ${ride.carDetails.brand} ${ride.carDetails.model}`}</Text> : ""}
        <Text numberOfLines={1} style={styles.location}>{`${ride.startLocation.address_line1} - ${ride.endLocation.address_line1}`}</Text>
      </View>
      <View>
        <Image
          style={{
            height: 56,
            width: 56,
            borderRadius: 56,
            borderWidth: 2,
            // borderColor: COLORS.white,
            // borderColor: COLORS.darkGray,
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
    // backgroundColor: COLORS.gray,
    backgroundColor: "#D9D9D9",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 1,
  },
  name: {
    // color: COLORS.white,
    fontFamily: FONTS.primaryBold,
    color: COLORS.darkGray,
    fontSize: 18,
  },
  car: {
    // color: COLORS.white,
    color: COLORS.darkGray,
    fontFamily: FONTS.primaryRegular,
  },
  location: {
    // color: COLORS.white,
    color: COLORS.darkGray,
    fontFamily: FONTS.primaryRegular,
  },
});

export default RideTile;
