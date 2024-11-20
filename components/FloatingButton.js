import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colours from "../colours";

export default function FloatingButton({
  IconComponent,
  iconName,
  iconSize = 40,
  iconColor = "white",
  onPress,
  shadowColor = colours.light.highlightGreen,
  buttonColor = colours.light.buttonGreen,
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