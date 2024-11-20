import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileInterfaceUser from "../../../components/ProfileInterfaceUser";
import ConfirmationModal from "../../../components/ConfirmationModal";
import colours from "../../../colours.js";

export default function Followers() {
  // Followers state: false = Follow, true = Following
  const [followers, setFollowers] = useState({
    "Miriam Doyle": true, // User is already being followed
    "Melody Watts": true, // User is already being followed
    "Leslie Leblanc": false, // User not followed yet
    "Janie Hutchinson": false, // User not followed yet
    "Roosevelt Soto": false,
    "Millard Sexton": false,
    "Zelma Carey": false,
    "Eduardo Hendricks": false,
    "Shaun Bates": false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUnfollow = () => {
    if (selectedUser) {
      setFollowers((prev) => ({
        ...prev,
        [selectedUser]: false, // Change the selected user to "Follow"
      }));
    }
    setModalVisible(false);
  };

  const handleFollow = (name) => {
    setFollowers((prev) => ({
      ...prev,
      [name]: true, // Change the selected user to "Following"
    }));
  };

  const openModal = (name) => {
    setSelectedUser(name);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.followerList}>
        <Text style={styles.heading1}>Followers</Text>
        {Object.keys(followers).map((name) => (
          <ProfileInterfaceUser
            key={name}
            name={name}
            members={`${Math.floor(Math.random() * 25)} mutual societies`}
            role={followers[name] ? "Following" : "Follow"}
            onPress={
              followers[name]
                ? () => openModal(name) // Show modal if already following
                : () => handleFollow(name) // Follow directly
            }
            isFollowing={followers[name]}
          />
        ))}
      </View>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleUnfollow}
        onCancel={() => setModalVisible(false)}
        message={`Are you sure you want to unfollow ${selectedUser}?`}
        confirmText="Yes, unfollow"
        cancelText="Cancel"
      />
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
