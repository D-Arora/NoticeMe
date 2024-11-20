import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileInterfaceUser from "../../../components/ProfileInterfaceUser";
import ConfirmationModal from "../../../components/ConfirmationModal";
import colours from "../../../colours.js";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Followers() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("profile/index", params)}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
  });
  // Followers state: false = Follow, true = Following
  const [followers, setFollowers] = useState({
    "Miriam Doyle": true, // user is already being followed
    "Melody Watts": true,
    "Leslie Leblanc": false, // user not followed
    "Janie Hutchinson": false,
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
        [selectedUser]: false, // change selected user to "Follow"
      }));
    }
    setModalVisible(false);
  };

  const handleFollow = (name) => {
    setFollowers((prev) => ({
      ...prev,
      [name]: true, // change selected user to "Following"
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
        <Text style={styles.heading1}>Followers</Text>
        {Object.keys(followers).map((name) => (
          <ProfileInterfaceUser
            key={name}
            name={name}
            members={`${Math.floor(Math.random() * 25)} mutual societies`}
            role={followers[name] ? "Following" : "Follow"}
            onPress={
              followers[name]
                ? () => openModal(name) // show modal
                : () => handleFollow(name) // follow
            }
            isFollowing={followers[name]}
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
