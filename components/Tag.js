import React, { useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";

const Tag = ({ title, colour }) => {
  return (
    <View style={[styles.button, { backgroundColor: colour }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    width: "30%",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Tag;
