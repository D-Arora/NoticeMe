// components/stickerText.js
import React from "react";
import { Dimensions, Platform } from "react-native";
import Svg, { Text } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StickerText = ({
  text,
  font = "System",
  fontSize = 20,
  textColor = "#000000",
  stroke = "#000000",
  strokeWidth = 2,
  x = SCREEN_WIDTH / 2,
  y = 50,
  rotation = 0,
  textAnchor = "middle",
}) => {
  // Format the font family name correctly
  const fontFamily = Platform.select({
    ios: font,
    android: font,
  });

  return (
    <Svg height={100} width={SCREEN_WIDTH}>
      {/* Outline layer */}
      <Text
        x={x}
        y={y}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        textAnchor={textAnchor}
        rotation={rotation}
      >
        {text}
      </Text>

      {/* Text fill layer - rendered on top */}
      <Text
        x={x}
        y={y}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={textColor}
        strokeWidth={0}
        textAnchor={textAnchor}
        rotation={rotation}
      >
        {text}
      </Text>
    </Svg>
  );
};

export { StickerText };
