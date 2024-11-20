import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
  useNavigation,
} from "expo-router";
import ProfileBackground from "../../../assets/ProfileBackgroundGradient.svg";
import EditProfile from "../../../assets/icons/EditProfile.svg";
import Tag from "../../../components/Tag";
import colours from "../../../colours.js";
import FollowersButton from "../../../components/FollowersButton";
import ProfileInterface from "../../../components/ProfileInterface";
import CommentCard from "../../../components/CommentCard";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const defaultProfile = {
  name: "Anna Wang",
  image: "https://pbs.twimg.com/media/GYIrv0iakAA4HaP?format=jpg&name=medium",
  followers: 123,
  following: 2088,
  description:
    "Hey there !! My name is Anna and I am a third year Mechatronic Engineering and Science student passionate about upskilling and improving myself.",
  year: "2nd Year",
  faculties: [
    { name: "Engineering", colour: "#0087FF" },
    { name: "Neuroscience", colour: "#1032B2" },
  ],
  societies: [
    {
      name: "Mechanical Engineering Society",
      members: "1078 members",
      role: "Member",
    },
    {
      name: "Neuroscience Society",
      members: "1234 members",
      role: "President",
    },
    { name: "Dog Lovers Society", members: "834 members", role: "Member" },
  ],
  comments: [
    {
      name: "NeuroSoc 2024 AGM",
      time: "3 hours ago",
      comment: "Yall cooked",
    },
  ],
};

export const defaultUsers = [
  {
    name: "Anna Wang",
    image: "https://pbs.twimg.com/media/GYIrv0iakAA4HaP?format=jpg&name=medium",
    followers: 123,
    following: 2088,
    description:
      "Hey there !! My name is Anna and I am a third year Mechatronic Engineering and Science student passionate about upskilling and improving myself.",
    year: "2nd Year",
    faculties: [
      { name: "Engineering", colour: "#0087FF" },
      { name: "Neuroscience", colour: "#0087FF" },
    ],
    societies: [
      {
        name: "Mechanical Engineering Society",
        members: "1078 members",
        role: "Member",
      },
      {
        name: "Neuroscience Society",
        members: "1234 members",
        role: "President",
      },
      { name: "Dog Lovers Society", members: "834 members", role: "Member" },
    ],
    comments: [
      {
        name: "NeuroSoc 2024 AGM",
        time: "3 hours ago",
        comment: "Yall cooked",
      },
    ],
  },
  {
    name: "Ethan Chen",
    image: "https://pbs.twimg.com/media/GYIr3YAbsAAP_5J?format=jpg&name=medium",
    followers: 895,
    following: 540,
    description:
      "Hi! I’m Ethan, a passionate fourth-year Computer Science student specializing in AI and machine learning. Always coding!",
    year: "4th Year",
    faculties: [{ name: "Computer Science", colour: "#FF5733" }],
    societies: [
      {
        name: "AI & Robotics Club",
        members: "1456 members",
        role: "Vice President",
      },
      {
        name: "Tech Enthusiasts Society",
        members: "903 members",
        role: "Member",
      },
    ],
    comments: [
      {
        name: "AI Hackathon 2024",
        time: "2 days ago",
        comment: "Amazing experience with a fantastic team!",
      },
    ],
  },
  {
    name: "Sophia Martinez",
    followers: 562,
    following: 780,
    description:
      "I’m Sophia, a third-year Environmental Science major. Advocate for sustainability and environmental justice.",
    year: "3rd Year",
    faculties: [{ name: "Environmental Science", colour: "#6AAB9D" }],
    societies: [
      {
        name: "Environmental Awareness Club",
        members: "678 members",
        role: "Treasurer",
      },
      {
        name: "Sustainability Initiative",
        members: "1345 members",
        role: "Member",
      },
    ],
    comments: [
      {
        name: "Earth Day Festival 2024",
        time: "1 week ago",
        comment: "Loved the community spirit!",
      },
    ],
  },
  {
    name: "Liam O'Connor",
    image: "https://pbs.twimg.com/media/GYIrKvYbcAAPCMe?format=jpg&name=medium",
    followers: 340,
    following: 125,
    description:
      "Hey, I’m Liam, a first-year Business Management student. Obsessed with entrepreneurship and marketing.",
    year: "1st Year",
    faculties: [{ name: "Business Management", colour: "#FFB400" }],
    societies: [
      {
        name: "Startup Incubator",
        members: "890 members",
        role: "Member",
      },
      {
        name: "Marketing Club",
        members: "456 members",
        role: "Event Coordinator",
      },
    ],
    comments: [
      {
        name: "Pitch Night 2024",
        time: "5 hours ago",
        comment: "Great pitches from everyone!",
      },
    ],
  },
  {
    name: "Emily Zhao",
    followers: 212,
    following: 318,
    description:
      "Hello, I'm Emily, a second-year Psychology student exploring the human mind and behavior. Fascinated by neuropsychology.",
    year: "2nd Year",
    faculties: [{ name: "Psychology", colour: "#C71585" }],
    societies: [
      {
        name: "Psychology Research Society",
        members: "560 members",
        role: "Member",
      },
      {
        name: "Mindfulness Club",
        members: "789 members",
        role: "Wellness Leader",
      },
    ],
    comments: [
      {
        name: "Wellness Week 2024",
        time: "3 days ago",
        comment: "So calming and rejuvenating.",
      },
    ],
  },
];

export default function Profile() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [user, setUser] = useState(
    Object.keys(params).length === 0
      ? defaultProfile
      : {
          ...params,
          faculties: params.faculties ? JSON.parse(params.faculties) : [],
          societies: params.societies ? JSON.parse(params.societies) : [],
          comments: params.comments ? JSON.parse(params.comments) : [],
        }
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    console.log(params);
    setUser(
      Object.keys(params).length === 0
        ? defaultProfile
        : {
            ...params,
            faculties: params.faculties ? JSON.parse(params.faculties) : [],
            societies: params.societies ? JSON.parse(params.societies) : [],
            comments: params.comments ? JSON.parse(params.comments) : [],
          }
    );
  }, [params]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* top of profile */}
      <View style={styles.header}>
        <ProfileBackground style={styles.profileBG} />
        <View style={styles.background}>
          <View style={styles.profileBar}>
            <View style={styles.profilePicture}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 9999 }}
                resizeMode="cover"
                source={
                  !user.image
                    ? require("../../../assets/adaptive-icon.png")
                    : { uri: user.image }
                }
              />
            </View>
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
                  {user.name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("profile/EditProfile", params)
                  }
                >
                  <EditProfile width="25px" />
                </TouchableOpacity>
              </View>
              <View style={styles.followersContainer}>
                <FollowersButton
                  title="Followers"
                  users={user.followers}
                  onPress={() =>
                    navigation.navigate("profile/followers", params)
                  }
                />
                <FollowersButton
                  title="Following"
                  users={user.following}
                  onPress={() =>
                    navigation.navigate("profile/following", params)
                  }
                />
              </View>
            </View>
          </View>
          <Text style={styles.description}>{user.description}</Text>
          <View style={styles.TagContainer}>
            <Tag title="2nd Year" colour="#FD7A02" />
            {/* <Tag title="Engineering" colour="#0087FF" />
            <Tag title="Neuroscience" colour="#8A3FC3" /> */}
            {user.faculties &&
              user.faculties.map((x, index) => (
                <Tag key={index} title={x.name} colour={x.colour} />
              ))}
          </View>
        </View>
      </View>

      {/* bottom of profile */}
      <View style={styles.bottomContainer}>
        <Text style={styles.heading1}>Societies</Text>
        {user.societies &&
          user.societies.map((x, index) => (
            <ProfileInterface
              key={index}
              name={x.name}
              members={x.members}
              role={x.role}
            />
          ))}
        <Text style={styles.heading1}>Recently Commented</Text>
        {user.comments &&
          user.comments.map((x, index) => (
            <CommentCard
              key={index}
              name={x.name}
              time={x.time}
              comment={x.comment}
            />
          ))}
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
    display: "flex",
  },
  profileBG: {
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  profilePicture: {
    backgroundColor: "white",
    width: 105,
    height: 105,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
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
