import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useRouter } from 'expo-router';
import ProfileBackground from '../../assets/ProfileBackgroundGradient.svg';
import EditProfile from '../../assets/icons/EditProfile.svg';
import Tag from "../../components/Tag";
import colours from "../../colours.js";
import FollowersButton from "../../components/FollowersButton";
import ProfileInterface from "../../components/ProfileInterface";
import CommentCard from "../../components/CommentCard";

export default function Profile() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* top of profile */}
      <View style={styles.header}>
        <ProfileBackground style={styles.profileBG} />
        <View style={styles.background}>

          <View style={styles.profileBar}>
            <View style={styles.profilePicture}></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-around" }}>
                <Text style={{ fontSize: 30, color: "white", justifyContent: 'center' }}>Anna Wang</Text>
                <EditProfile width="25px" onPress={() => router.push('/EditProfile')} />
              </View>
              <View style={styles.followersContainer}>
                <FollowersButton title="Followers" users={123} />
                <FollowersButton title="Following" users={2078} />
              </View>
            </View>
          </View>
          <Text style={styles.description}>
            Hey there !! My name is Anna and I am a third year Mechatronic Engineering and Science student passionate about upskilling and improving myself.
          </Text>
          <View style={styles.TagContainer}>
            <Tag title="2nd Year" colour="#FD7A02" />
            <Tag title="Engineering" colour="#0087FF" />
            <Tag title="Neuroscience" colour="#8A3FC3" />
          </View>
        </View>
      </View>

      {/* bottom of profile */}
      <View style={styles.bottomContainer}>
        <Text style={styles.heading1}>Societies</Text>
        <ProfileInterface name="Mechanical Engineering Society" members="1078 members" role="Member" />
        <ProfileInterface name="Neuroscience Society" members="1234 members" role="President" />
        <ProfileInterface name="Dog Lovers Society" members="834 members" role="Member" />
        <Text style={styles.heading1}>Recently Commented</Text>
        <CommentCard name="NeuroSoc 2024 AGM" time="3 hours ago" comment="Yall cooked" />
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  TagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  followersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  background: {
    display: 'flex',
  },
  profileBG: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  profilePicture: {
    backgroundColor: 'white',
    width: 105,
    height: 105,
    borderRadius: 100,
    marginTop: 10
  },
  header: {
    padding: 20,
  },
  profileBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 24,
    color: 'white',
  },
  bottomContainer: {
    padding: 20,
  },
  heading1: {
    fontSize: 30,
    color: colours.light.text,
    marginBottom: 10,
  }
});
