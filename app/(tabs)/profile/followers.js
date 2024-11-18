import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colours from "../../../colours.js";
import ProfileInterface from "../../../components/ProfileInterface";

export default function Followers() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.followerList}>
        <Text style={styles.heading1}>Followers</Text>
        {/*search bar component to go here*/}
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
        <ProfileInterface
          name="Miriam Doyle"
          members="17 mutual societies"
          role="Following"
        ></ProfileInterface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  followerList: {
    padding: 20,
  },
  heading1: {
    fontSize: 30,
    color: colours.light.text,
    marginBottom: 10,
  },
});
