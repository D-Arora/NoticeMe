import React from "react";
import { Tabs, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";

import colours from "../../colours";
import StickerText from "../../components/StickerText";
import Logo from "../../assets/icons/hat-logo.png";
import EventsIcon from "../../assets/icons/events.svg";
import CalendarIcon from "../../assets/icons/calendar-simplified.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ActivityIcon from "../../assets/icons/activity.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

const Header = () => (
  <View style={styles.headerTitleContainer}>
    <Image source={Logo} style={styles.logo} />
    <StickerText text="NoticeMe" fontFamily="Bold" />
  </View>
);

const tabScreens = [
  { name: "events/index", label: "Events", Icon: EventsIcon },
  { name: "calendar", label: "Calendar", Icon: CalendarIcon },
  { name: "search", label: "Search", Icon: SearchIcon },
  { name: "activity", label: "Activity", Icon: ActivityIcon },
  { name: "profile", label: "Profile", Icon: ProfileIcon },
];

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours.light.primaryPurple,
        tabBarInactiveTintColor: colours.light.primaryGreen,
        tabBarStyle: {
          shadowOpacity: 0,
          borderTopWidth: 3,
          borderColor: colours.light.highlightGreen,
          height: 64,
          paddingTop: 2,
          paddingBottom: Platform.select({
            ios: 0,
            android: 6,
          }),
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarLabelStyle: {
          fontFamily: "Bold",
          fontSize: 14,
          textShadowColor: colours.light.primaryGreen,
          textShadowRadius: 0,
          textShadowOffset: { width: 0, height: 10 },
        },
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 3,
          borderColor: colours.light.highlightGreen,
          height: Platform.select({
            ios: 100,
            android: 86,
          }),
        },
        headerTitle: () => <Header />,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons
              name="arrow-back"
              size={32}
              color={colours.light.text}
            />
          </TouchableOpacity>
        ),
      }}
    >
      {tabScreens.map(({ name, label, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: ({ focused }) => (
              <Text
                style={[
                  styles.iconText,
                  focused && { color: colours.light.primaryPurple },
                ]}
              >
                {label}
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <View
                style={[
                  styles.iconContainer,
                  color === colours.light.primaryPurple && styles.activeIcon,
                ]}
              >
                <Icon width={32} height={32} fill={color} />
              </View>
            ),
          }}
        />
      ))}
      <Tabs.Screen
        name="events/map"
        options={{
          href: null,
          title: "Events",
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === "#8A3FC3" && styles.activeIcon,
              ]}
            >
              <EventsIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === "#8A3FC3" && styles.activeIcon,
              ]}
            >
              <ProfileIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/followers"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/editProfile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/following"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="events/event"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="events/createEvent"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  backButton: {
    paddingLeft: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 5,
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: "center",
  },
  activeIcon: {
    strokeWidth: 2,
  },
  iconText: {
    fontSize: 14,
    color: colours.light.primaryGreen,
    fontFamily: "Bold",
  },
});
