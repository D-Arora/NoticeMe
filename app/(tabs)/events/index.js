import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import FloatingButton from "../../../components/FloatingButton"; // Adjust the import path
import EventCarousel from "../../../components/EventCarousel";
import BackgroundImage from "../../../assets/images/mesh-898.png";
import sampleEvents from "./sampleEvents.json";
import colours from "../../../colours";

export default function Events() {
  return (
    <ImageBackground
      source={BackgroundImage}
      imageStyle={{ opacity: 0.1 }}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <View style={styles.backgroundView} />
        <View style={styles.backgroundView2} />
        <View style={styles.foregroundView}>
          <Text style={styles.titleText}>Upcoming Events</Text>
        </View>
      </View>

      <EventCarousel cards={sampleEvents} />

      <FloatingButton
        IconComponent={Entypo}
        iconName="plus"
        iconSize={40}
        iconColor="white"
        onPress={() => console.log("Create Event")}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  textContainer: {
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backgroundView: {
    position: "absolute",
    width: 220, // Adjust size as needed
    height: 60, // Adjust size as needed
    borderRadius: 30, // Fully rounded corners
    backgroundColor: colours.light.buttonGreen,
    right: 30, // Offset down by 10
  },
  backgroundView2: {
    position: "absolute",
    width: 220, // Adjust size as needed
    height: 60, // Adjust size as needed
    borderRadius: 30, // Fully rounded corners
    backgroundColor: colours.light.highlightGreen,
    left: 30, // Offset down by 10
  },
  foregroundView: {
    width: 220, // Match the background view size
    height: 60, // Match the background view size
    borderRadius: 30, // Fully rounded corners
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colours.light.primaryGreen,
  },
  titleText: {
    fontFamily: "Bold",
    fontSize: 24,
    color: colours.light.text,
    lineHeight: 24,
  },
});
