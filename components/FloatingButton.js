import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colours from "../colours";

export default function FloatingButton({
  IconComponent, // Icon component (e.g., Entypo from @expo/vector-icons)
  iconName, // Name of the icon
  iconSize = 40, // Default icon size
  iconColor = "white", // Default icon color
  onPress, // Function triggered on button press
  shadowColor = colours.light.highlightGreen, // Shadow background color
  buttonColor = colours.light.buttonGreen, // Button background color
}) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <View style={[styles.shadow, { backgroundColor: shadowColor }]} />
      <IconComponent
        style={[styles.icon, { backgroundColor: buttonColor }]}
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  shadow: {
    position: "absolute",
    top: 5,
    width: 56,
    height: 56,
    borderRadius: 30,
    zIndex: -1,
  },
  icon: {
    borderRadius: 30,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
