import { Tabs, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../../assets/noticeme.png";

import EventsIcon from "../../assets/icons/events.svg";
import CalendarIcon from "../../assets/icons/calendar-simplified.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ActivityIcon from "../../assets/icons/activity.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import colours from "../../colours";

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
            ios: 64 + insets.bottom,
            android: 64,
          }),
          paddingTop: 2,
          paddingBottom: Platform.select({
            ios: insets.bottom + 6,
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
            ios: 44 + insets.top,
            android: 56 + insets.top,
          }),
        },
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitleShadow}>NoticeMe</Text>
              <Text style={styles.headerTitleText}>NoticeMe</Text>
            </View>
          </View>
        ),
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
        name="events"
        options={{
          title: "Events",
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
          title: "Calendar",
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
          title: "Search",
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
          title: "Activity",
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
          title: "Profile",
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
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },

  headerTextContainer: {
    position: "relative",
  },

  headerTitleText: {
    fontSize: 28,
    fontFamily: "Bold",
    color: "#006D62",
  },

  headerTitleShadow: {
    position: "absolute",
    fontSize: 28,
    fontFamily: "Bold",
    color: colours.light.primaryGreen,
    top: 3,
  },

  backButton: {
    paddingLeft: 10,
  },

  iconContainer: {
    justifyContent: "center",
    // alignItems: "center",
    // shadowColor: "#000", // Shadow color
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3, // Shadow opacity
    // shadowRadius: 4, // Shadow blur
    // elevation: 5, // Shadow for Android
  },

  activeIcon: {
    strokeWidth: 2,
    // stroke: colours.light.primaryGreen, // Outline color when active
  },
});
