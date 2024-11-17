import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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

  const handlePress = () => {
    if (colourChange) {
      setIsClicked(!isClicked);
      // change the title to the alternative colour
    }
    onPress && onPress(); // Call the provided onPress function if it exists
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        shadowColor: !shadowColour ? colours.light.primary : shadowColour,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      }}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: isClicked
              ? colours.light.text
              : !colour
              ? colours.light.secondary
              : colour,
          }, // Toggle color based on isClicked state
        ]}
      >
        <Text style={{color: textColour ? textColour : "white",
        fontSize: textSize ? textSize : 16}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    alignItems: "center",
  }
});

export default StyledButton;
