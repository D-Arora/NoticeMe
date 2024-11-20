import React from "react";
import { Text, View, StyleSheet } from "react-native";

const StickerText = ({
  text = "placeholder text...",
  fontSize = 30,
  fontFamily = "Regular",
  textColor = "#006D62",
  shadowColor = "#00bfae",
  alignment = "center",
  shadowOffset = 2,
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
  mainText: {},
  textShadow: {
    position: "absolute",
  },
});

export default StickerText;
