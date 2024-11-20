import MapView, { Marker } from "react-native-maps";

export const MiniMap = ({ location, onPress }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02,
      }}
      onPress={onPress}
    >
      <Marker coordinate={location} />
    </MapView>
  );
};
