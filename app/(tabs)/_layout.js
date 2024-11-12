import React from "react";
import { Tabs, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colours from "../../colours";
import StickerText from "../../components/StickerText";
import Logo from "../../assets/icons/hat-logo.png";
import EventsIcon from "../../assets/icons/events.svg";
import CalendarIcon from "../../assets/icons/calendar-simplified.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ActivityIcon from "../../assets/icons/activity.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

// Header component within the same file
const Header = () => {
  return (
    <View style={[styles.headerTitleContainer]}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Image source={Logo} style={styles.logo} />
      <StickerText text="NoticeMe" fontFamily="Bold" />
    </View>
  );
};

export default function TabsLayout() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours.light.primaryPurple,
        tabBarInactiveTintColor: colours.light.primaryGreen,
        tabBarStyle: {
          shadowOpacity: 0,
          borderTopWidth: 3,
          borderTopColor: colours.light.primaryGreen,
          height: Platform.select({
            ios: 30 + insets.bottom,
            android: 64,
          }),
          paddingTop: 2,
          paddingBottom: Platform.select({
            ios: 0,
            android: 6,
          }),
        },
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
          borderBottomColor: colours.light.primaryGreen,
          height: Platform.select({
            ios: 64 + insets.top,
            android: 56 + insets.top,
          }),
        },
        headerTitle: () => <Header />,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={32} color="#006D62" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="events/index"
        options={{
          title: () => (
            <StickerText
              text="Events"
              fontSize="14"
              textColor={colours.light.primaryGreen}
              shadowColour={colours.light.text}
              shadowOffset={1}
            />
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === colours.light.primaryPurple && styles.activeIcon,
              ]}
            >
              <EventsIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: () => (
            <StickerText
              text="Calendar"
              fontSize="14"
              textColor={colours.light.primaryGreen}
              shadowColour={colours.light.text}
              shadowOffset={1}
            />
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === colours.light.primaryPurple && styles.activeIcon,
              ]}
            >
              <CalendarIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: () => (
            <StickerText
              text="Search"
              fontSize="14"
              textColor={colours.light.primaryGreen}
              shadowColour={colours.light.text}
              shadowOffset={1}
            />
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === colours.light.primaryPurple && styles.activeIcon,
              ]}
            >
              <SearchIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: () => (
            <StickerText
              text="Activity"
              fontSize="14"
              textColor={colours.light.primaryGreen}
              shadowColour={colours.light.text}
              shadowOffset={1}
            />
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === colours.light.primaryPurple && styles.activeIcon,
              ]}
            >
              <ActivityIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: () => (
            <StickerText
              text="Profile"
              fontSize="14"
              textColor={colours.light.primaryGreen}
              shadowColour={colours.light.text}
              shadowOffset={1}
            />
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === colours.light.primaryPurple && styles.activeIcon,
              ]}
            >
              <ProfileIcon width={32} height={32} fill={color} />
            </View>
          ),
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
});
