import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colours from "../colours";

const StyledButton = ({
  onPress,
  title,
  colour,
  shadowColour,
  colourChange,
  textColour,
  textSize
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(null);

  const handlePress = () => {
    if (colourChange) {
      setIsClicked(!isClicked);
    }
    onPress && onPress();
  };

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setButtonLayout({ width, height });
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
              top: 3,
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
        onLayout={handleLayout}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonShadow: {
    position: "absolute",
    backgroundColor: colours.light.primaryGreen,
    borderRadius: 30,
    marginVertical: 12,
  },
});

export default StyledButton;
