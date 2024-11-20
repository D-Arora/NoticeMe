import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colours from "../colours";
import StyledButton from "./StyledButton";

const ProfileInterfaceUser = ({
  onPress,
  onProfilePress, // Accept the onProfilePress prop
  name,
  members,
  role,
  isFollowing,
}) => {
  return (
    <View style={styles.boxContainer}>
      {/* The whole area, except for the StyledButton, will be clickable */}
      <TouchableOpacity
        onPress={onProfilePress} // Profile click handler
        style={styles.profileContent}
        activeOpacity={0.8} // Optional: adds a slight opacity change when clicked
      >
        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}></View>
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.membersText}>{members}</Text>
        </View>
      </TouchableOpacity>

      {/* The StyledButton stays separate and does not trigger the profile navigation */}
      <View>
        <StyledButton
          onPress={onPress}
          title={role}
          colour={isFollowing ? colours.light.secondary : "#006D62"}
          textColour={isFollowing ? "white" : "white"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: colours.light.primary,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Take up all available space except the button
  },
  profilePictureContainer: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colours.light.primary,
  },
  profileInfo: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  membersText: {
    fontSize: 12,
    color: colours.light.secondary,
  },
});

export default ProfileInterfaceUser;
