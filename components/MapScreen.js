import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

const MapScreen = ({ x1, y1, x2, y2 }) => {
  const markers = [
    { coordinate: { latitude: x1, longitude: y1 }, title: "Start Point" },
    { coordinate: { latitude: x2, longitude: y2 }, title: "End Point" },
  ];

  const sizex = Math.abs(x1 - x2) * 1.4 > 0.012 ? Math.abs(x1 - x2) * 1.4 : 0.012;
  const sizey = Math.abs(y1 - y2) * 1.4 > 0.012 ? Math.abs(y1 - y2) * 1.4 : 0.012;

  const [mapReady, setMapReady] = useState(false);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`https://api.geoapify.com/v1/routing?waypoints=${x1},${y1}|${x2},${y2}&mode=drive&apiKey=aacfa879748e45b291751d430282f092`, {});
        const coordinates = response.data.features[0].geometry.coordinates[0];
        const decodedCoordinates = coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(decodedCoordinates);
      } catch (error) {
        console.error("MapScreen: ", error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLayout={onMapLayout}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          mapReady
            ? {
                latitude: (markers[0].coordinate.latitude + markers[1].coordinate.latitude) / 2,
                longitude: (markers[0].coordinate.longitude + markers[1].coordinate.longitude) / 2,
                latitudeDelta: sizex,
                longitudeDelta: sizey,
              }
            : null
        }
      >
        {routeCoordinates.length > 0 && <Polyline coordinates={routeCoordinates} strokeColor="#000" strokeWidth={4} />}
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} title={marker.title} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
