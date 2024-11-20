import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Map({ region, location }) {
  const params = useLocalSearchParams();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [eventLocation, setEventLocation] = useState(region);

  useEffect(() => {
    const location = {
      latitude: !params.latitude
        ? -33.91749497624781
        : parseFloat(params.latitude),
      longitude: !params.longitude
        ? 151.23345432234584
        : parseFloat(params.longitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setEventLocation(location);
  }, [mapRef, markerRef, params.location, params.latitude, params.longitude]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={eventLocation}
          region={eventLocation}
        >
          <Marker
            ref={markerRef}
            tappable={false} // when marker is tappable buggy edge cases occur
            coordinate={{
              latitude: eventLocation.latitude,
              longitude: eventLocation.longitude,
            }}
            title={!params.location ? "location" : params.location}
            description={`${!params.eventName ? "title" : params.eventName} @ ${
              eventLocation.latitude + " , " + eventLocation.longitude
            }`}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
