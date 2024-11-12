// screens/Events.js
import React from "react";
import { View, Text } from "react-native";
import { StickerText } from "../../components/StickerText";
import StyledButton from "../../components/StyledButton";

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
        text="Event Details"
        fontFamily="Regular"
        fontSize={40}
        textColor="#fff"
        shadowColor="#016d63"
      />
      <StyledButton
        title="President"
        onPress={() => console.log("Create Event")}
        colourChange={true}
      />
    </View>
  );
}
