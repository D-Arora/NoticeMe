import React, { useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";

const StyledButton = ({ onPress, title, colourChange }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    if (colourChange) {
      setIsClicked(!isClicked);
      // change the title to the alternative colour
    }
    onPress && onPress(); // Call the provided onPress function if it exists
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.shadowContainer}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: isClicked
              ? colours.light.text
              : colours.light.secondary,
          }, // Toggle color based on isClicked state
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default StyledButton;
