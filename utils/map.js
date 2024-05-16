import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({x1, y1, x2, y2}) => {
  const markers = [
    { coordinate: { latitude: x1, longitude: y1 }, title: 'Start Point' },
    { coordinate: { latitude: x2, longitude: y2 }, title: 'End Point' }
  ];

  const sizex = Math.abs(x1 - x2)*1.4>0.012?Math.abs(x1 - x2)*1.4:0.012;
  const sizey = Math.abs(y1 - y2)*1.4>0.012?Math.abs(y1 - y2)*1.4:0.012;

  const [mapReady, setMapReady] = useState(false);

  const onMapLayout = () => {
    setMapReady(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLayout={onMapLayout}
        initialRegion={mapReady ? {
          latitude: (markers[0].coordinate.latitude + markers[1].coordinate.latitude) / 2,
          longitude: (markers[0].coordinate.longitude + markers[1].coordinate.longitude) / 2,
          latitudeDelta: sizex,
          longitudeDelta: sizey,
        } : null}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
