import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  map: {
    height: 200,
    marginBottom: 15,
    borderRadius: 40,
  },
});
