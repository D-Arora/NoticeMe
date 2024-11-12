import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colours from "../colours";

const StyledButton = ({ onPress, title, colourChange }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(null); // To store the button's layout

  const handlePress = () => {
    if (colourChange) {
      setIsClicked(!isClicked);
      // change the title to the alternative colour
    }
    onPress && onPress(); // Call the provided onPress function if it exists
  };

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setButtonLayout({ width, height }); // Set the button's width and height
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.shadowContainer}>
      {/* Pseudo Shadow */}
      {buttonLayout && (
        <View
          style={[
            styles.buttonShadow,
            {
              width: buttonLayout.width,
              height: buttonLayout.height,
              top: 3, // Adjust position of the shadow
            },
          ]}
        />
      )}

      {/* Button */}
      <View
        style={[
          styles.button,
          {
            backgroundColor: isClicked
              ? colours.light.text
              : colours.light.primaryPurple,
          },
        ]}
        onLayout={handleLayout} // Measure button size on layout
      >
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative", // Ensure container positions elements correctly
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
  buttonShadow: {
    position: "absolute", // Position the shadow beneath the button
    backgroundColor: colours.light.primaryGreen, // Shadow color
    borderRadius: 30, // Same as button's border radius
  },
});

export default StyledButton;
