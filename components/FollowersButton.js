import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";

const FollowersButton = ({ onPress, title, users}) => {
  
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
    shadowColor: colours.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: "white"
  },
  buttonText: {
    fontSize: 16,
    color: colours.light.text
  },
  numberText: {
    fontSize: 25,
    color: colours.light.text
  },
});

export default FollowersButton;