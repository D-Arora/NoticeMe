import React from "react";
import { View, StyleSheet } from "react-native";
import StickerText from "../../../components/StickerText";
import { Entypo } from "@expo/vector-icons";
import FloatingButton from "../../../components/FloatingButton"; // Adjust the import path
import EventCard from "../../../components/EventCard";

export default function Events() {
  return (
    <View style={styles.container}>
      <StickerText text="Event Details" fontFamily="Regular" fontSize={40} />

      <EventCard
        eventName="Test"
        societyName="SomeSoc"
        date="Date"
        location="Mexico"
      />

      <FloatingButton
        IconComponent={Entypo}
        iconName="plus"
        iconSize={40}
        iconColor="white"
        onPress={() => console.log("Create Event")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
