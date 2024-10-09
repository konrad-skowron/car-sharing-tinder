import React, { StyleSheet, Text, View, Image } from "react-native";
import { COLORS, FONTS } from "../constants";

const RideTile = ({ ride }) => {
  return (
    <View style={styles.container}>
      <View style={{ maxWidth: "75%" }}>
        {ride.user.firstName && ride.user.lastName && <Text style={styles.name}>{`${ride.user.firstName} ${ride.user.lastName}`}</Text>}
        {Object.keys(ride.carDetails).length && ride.carDetails != null ? (
          <Text style={styles.car}>{`${capitalizeFirstLetter(ride.carDetails.color)} ${ride.carDetails.brand} ${ride.carDetails.model}`}</Text>
        ) : (
          ""
        )}
        <Text numberOfLines={1} style={styles.location}>{`${ride.startLocation.address_line1} - ${ride.endLocation.address_line1}`}</Text>
      </View>
      <View>
        <Image
          style={{
            height: 56,
            width: 56,
            borderRadius: 56,
            borderWidth: 2,
          }}
          source={{
            uri: ride.user.imageUrl ? ride.user.imageUrl : "https://via.placeholder.com/150",
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
    backgroundColor: "#D9D9D9",
  },
  name: {
    fontFamily: FONTS.primaryBold,
    color: COLORS.darkGray,
    fontSize: 18,
  },
  car: {
    color: COLORS.darkGray,
    fontFamily: FONTS.primaryRegular,
  },
  location: {
    color: COLORS.darkGray,
    fontFamily: FONTS.primaryRegular,
  },
});

export default RideTile;
