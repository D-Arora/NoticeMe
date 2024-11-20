import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colours from "../../../colours.js";
import ProfileInterfaceUser from "../../../components/ProfileInterfaceUser.js";
import ConfirmationModal from "../../../components/ConfirmationModal.js";
import { useNavigation } from "@react-navigation/native";

export default function Following() {
  // const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [following, setFollowing] = useState({
    "Ethan Chen": true,
    "Sophia Martinez": true,
    "Liam O'Connor": true,
    "Emily Zhao": true,
    "Miriam Doyle": true, // True = "Following", false = "Not Following"
    "Melody Watts": true,
    "Deandre Zavala": true,
    "Beth Garza": true,
    "Jeff Roberson": true,
    "Carmine Pennington": true,
    "Abraham Carter": true,
    "Rolf Wu": true,
    "Derrick Colon": true,
  });

  const handleUnfollow = () => {
    if (selectedUser) {
      setFollowing((prev) => ({
        ...prev,
        [selectedUser]: false,
      }));
    }
    setModalVisible(false);
  };

  const handleFollow = (name) => {
    setFollowing((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const openModal = (name) => {
    setSelectedUser(name);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.followerList}>
        <Text style={styles.heading1}>Following</Text>
        {Object.keys(following).map((name) => (
          <ProfileInterfaceUser
            key={name}
            name={name}
            members={`${Math.floor(Math.random() * 25)} mutual societies`}
            role={following[name] ? "Following" : "Follow"}
            onPress={
              following[name] ? () => openModal(name) : () => handleFollow(name)
            }
            isFollowing={following[name]}
          />
        ))}
      </View>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleUnfollow}
        onCancel={handleCancel}
        message={`Are you sure you want to unfollow ${selectedUser}?`}
        messageConfirm="Yes, unfollow"
        messageCancel="Cancel"
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
