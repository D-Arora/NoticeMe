import React, { useEffect, useState, useRef } from "react";
// import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
// import MapView, { Marker } from "react-native-maps";
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
import Map from "../../../components/Map";

export default function MapPage() {
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

  return <Map />;
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
