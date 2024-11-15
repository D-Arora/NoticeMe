import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Map({ region, location }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Map View is not available on the web. Use platform on iOS or Andriod
      </Text>
      <Pressable
        style={{
          shadowColor: "#64CEC2",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 6,
          backgroundColor: "#F7F7F7",
          borderRadius: 28,
          padding: 10,
          justifyContent: "center",
        }}
        onPress={() => {
          Linking.openURL(`https://maps.google.com?q=${location}`);
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1}>Open in google maps</Text>
          <EvilIcons name="external-link" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
}
