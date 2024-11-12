// components/StickerText.js
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const StickerText = ({
  text = "placeholder text...",
  fontSize = 28,
  fontFamily = "Regular",
  textColor = "#006D62",
  shadowColor = "#00bfae",
  alignment = "center", // Alignment prop
  shadowOffset = 2, // New shadowOffset prop with default value of 3
}) => {
  return (
    <View style={[styles.textContainer, { alignItems: alignment }]}>
      <Text
        style={[
          styles.textShadow,
          {
            fontSize,
            fontFamily,
            color: shadowColor,
            textAlign: alignment,
            top: shadowOffset,
          },
        ]}
      >
        {text}
      </Text>
      <Text
        style={[
          styles.mainText,
          { fontSize, fontFamily, color: textColor, textAlign: alignment },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: "relative",
  },
  mainText: {
    // Additional styling if needed
  },
  textShadow: {
    position: "absolute",
  },
});

export default StickerText;
