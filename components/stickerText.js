import React from "react";
import { Text, View } from "react-native";

const StickerText = ({
  text = "placeholder text...",
  fontSize = 28,
  fontFamily = "Regular",
  textColor = "#006D62",
  shadowColor = "#00bfae",
}) => {
  return (
    <View style={styles.textContainer}>
      <Text
        style={[
          styles.textShadow,
          { fontSize, fontFamily, color: shadowColor },
        ]}
      >
        {text}
      </Text>
      <Text
        style={[styles.mainText, { fontSize, fontFamily, color: textColor }]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = {
  textContainer: {
    position: "relative",
  },
  mainText: {},
  textShadow: {
    position: "absolute",
    top: 3,
  },
};

export default StickerText;
