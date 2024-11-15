import React, { useEffect, useState, useRef } from "react";
// import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapView, { Marker } from "react-native-maps";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Map() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventLocation, setEventLocation] = useState({
    latitude: !params.latitude
      ? -33.91749497624781
      : parseFloat(params.latitude),
    longitude: !params.longitude
      ? 151.23345432234584
      : parseFloat(params.longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

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
    focusMap(location);
  }, [mapRef, markerRef, params.location, params.latitude, params.longitude]);

  const focusMap = (eventLocation) => {
    // mapRef.current?.animateToRegion(eventLocation);

    // Or change the camera with a duration
    mapRef.current?.animateCamera(
      { center: eventLocation, zoom: 10 },
      { duration: 1000 }
    );
  };

  const onRegionChange = (region) => {
    console.log(region);
  };

  const openExternalMaps = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        eventLocation.latitude +
        "," +
        eventLocation.longitude +
        "?q=" +
        params.location,
      android:
        "geo:" +
        eventLocation.latitude +
        "," +
        eventLocation.longitude +
        "?q=" +
        params.location,
    });
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {Platform.OS == "web" ? (
          <Text>Map View</Text>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={eventLocation}
            region={eventLocation}
            onRegionChange={onRegionChange}
          >
            <Marker
              // isPreselected={true}
              // titleVisibility="visible"
              // subtitleVisibility="visible"
              ref={markerRef}
              tappable={false} // when marker is tappable buggy edge cases occur
              coordinate={{
                latitude: eventLocation.latitude,
                longitude: eventLocation.longitude,
              }}
              title={!params.location ? "location" : params.location}
              description={`${!params.title ? "title" : params.title} @ ${
                eventLocation.latitude + " , " + eventLocation.longitude
              }`}
              flat={true}
              // pinColor={"#006D62"}
            />
          </MapView>
        )}
      </View>
      <View style={{ position: "absolute", padding: 10, width: "100%" }}>
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <View
            style={{
              position: "relative",
              backgroundColor: "white",
              borderRadius: 28,
              width: "100%",
              padding: 10,
              alignItems: "center",
              shadowColor: "#64CEC2",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 6,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
                width: "100%",
                gap: 10,
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 20 }}
                resizeMode="cover"
                source={
                  !params.image
                    ? require("../assets/adaptive-icon.png")
                    : { uri: params.image }
                }
              />
              <View style={{ overflow: "scroll", flexShrink: 1 }}>
                <Text
                  style={{ color: "#006D62", fontFamily: "Bold", fontSize: 30 }}
                  numberOfLines={1}
                >
                  {!params.title ? "undefined title" : params.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time" size={24} color="#006D62" />
                  <Text style={{ color: "#006D62" }} numberOfLines={1}>
                    {!params.start ? "undefined start" : params.start}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="location-sharp" size={24} color="#006D62" />
                  <Text style={{ color: "#006D62" }} numberOfLines={3}>
                    {/* {JSON.stringify(params)} */}
                    {!params.location ? "undefined location" : params.location}
                    {`\n ${
                      eventLocation.latitude + " , " + eventLocation.longitude
                    }`}
                  </Text>
                </View>
              </View>
            </View>
            {isExpanded && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[styles.button, { flexShrink: 0 }]}
                  onPress={openExternalMaps}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text numberOfLines={1}>Open in external Maps</Text>
                    <EvilIcons name="external-link" size={24} color="black" />
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.button, { flexShrink: 1 }]}
                  onPress={() => navigation.navigate("events/event", params)}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                    >{`Event Page "${params.title}"`}</Text>
                  </View>
                </Pressable>
              </View>
            )}
            <AntDesign
              style={{ marginTop: 10 }}
              name={isExpanded ? "up" : "down"}
              size={18}
              color="#006D62"
            />
          </View>
        </Pressable>
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
  button: {
    shadowColor: "#64CEC2",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    backgroundColor: "#F7F7F7",
    borderRadius: 28,
    padding: 10,
    justifyContent: "center",
  },
});
