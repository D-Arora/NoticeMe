// screens/Events.js
import React from "react";
import { View, Text } from "react-native";
import { StickerText } from "../../components/stickerText";

export default function Events() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginTop: 100 }}>Events Screen</Text>
      <StickerText
        text="Test Outline"
        font="System"
        fontSize={40}
        textColor="#fff"
        stroke="#016d63"
        strokeWidth={2}
      />
    </View>
  );
}
