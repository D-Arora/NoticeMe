import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileBackground from "../../../assets/ProfileBackgroundGradient.svg";
import EditProfile from "../../../assets/icons/EditProfile.svg";
import Tag from "../../../components/Tag.js";
import colours from "../../../colours.js";
import FollowersButton from "../../../components/FollowersButton.js";
import ProfileInterface from "../../../components/ProfileInterface.js";
import CommentCard from "../../../components/CommentCard.js";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* top of profile */}
      <View style={styles.header}>
        <ProfileBackground style={styles.background} />

        <View style={styles.profileBar}>
          <View style={styles.profilePicture}></View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  justifyContent: "center",
                }}
              >
                Anna Wang
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("profile/editProfile", params)
                }
              >
                <EditProfile width="25px" />
              </TouchableOpacity>
            </View>
            <View style={styles.followersContainer}>
              <FollowersButton
                title="Followers"
                users={123}
                onPress={() => navigation.navigate("profile/followers", params)}
              />
              <FollowersButton title="Following" users={2078} />
            </View>
          </View>
        </View>
        <Text style={styles.description}>
          Hey there !! My name is Anna and I am a third year Mechatronic
          Engineering and Science student passionate about upskilling and
          improving myself.
        </Text>
        <View style={styles.TagContainer}>
          <Tag title="2nd Year" colour="#8A3FC3" />
          <Tag title="Engineering" colour="#006e62" />
          <Tag title="Neuroscience" colour="#3c6392" />
        </View>
      </View>

      {/* bottom of profile */}
      <View style={styles.bottomContainer}>
        <Text style={styles.heading1}>Societies</Text>
        <ProfileInterface
          name="Mechanical Engineering Society"
          members="1078 members"
          role="Member"
        />
        <ProfileInterface
          name="Neuroscience Society"
          members="1234 members"
          role="President"
        />
        <ProfileInterface
          name="Dog Lovers Society"
          members="834 members"
          role="Member"
        />
        <Text style={styles.heading1}>Recently Commented</Text>
        <CommentCard
          name="NeuroSoc 2024 AGM"
          time="3 hours ago"
          comment="Yall cooked"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  followersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profilePicture: {
    backgroundColor: "white",
    width: 105,
    height: 105,
    borderRadius: 100,
    marginTop: 10,
  },
  header: {
    padding: 20,
  },
  profileBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 24,
    color: "white",
  },
  bottomContainer: {
    padding: 20,
  },
  heading1: {
    fontSize: 30,
    color: colours.light.text,
    marginBottom: 10,
  },
});
