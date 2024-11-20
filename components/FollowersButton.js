import React, { useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";

const FollowersButton = ({ onPress, title, users }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.shadowContainer}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
        <Text style={styles.numberText}>{users}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: colours.light.primaryGreen,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 16,
    color: colours.light.text,
    fontFamily: "Regular",
  },
  numberText: {
    fontSize: 28,
    color: colours.light.text,
    fontFamily: "Regular",
  },
});

export default FollowersButton;
