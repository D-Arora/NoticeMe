import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import StickerText from "../../../components/StickerText";
import { Entypo } from "@expo/vector-icons";

export default function Events() {
  return (
    <View style={styles.container}>
      <StickerText text="Event Details" fontFamily="Regular" fontSize={40} />

      {/* Background "shadow" view */}
      <View style={styles.floatingButtonShadow} />

      {/* Floating Plus Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log("Create Event")}
      >
        <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  floatingButtonShadow: {
    position: "absolute",
    right: 20,
    bottom: 15,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#A0D8D1",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#3fc3ad",
    justifyContent: "center",
    alignItems: "center",
  },
});
