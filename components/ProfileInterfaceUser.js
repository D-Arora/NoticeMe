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
      <TouchableOpacity
        onPress={onProfilePress} // Profile click handler
        style={styles.profileContent}
        activeOpacity={0.8}
      >
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}></View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.membersText}>{members}</Text>
        </View>
      </TouchableOpacity>

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
    flex: 1,
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
