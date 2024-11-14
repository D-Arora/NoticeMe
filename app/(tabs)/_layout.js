import { Tabs, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import colours from "../../colours";

import Logo from "../../assets/noticeme.png";

import EventsIcon from "../../assets/icons/events.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ActivityIcon from "../../assets/icons/activity.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8A3FC3",
        tabBarInactiveTintColor: "#64CEC2",
        tabBarStyle: {
          // margin: 30,
          shadowOpacity: 0,
          borderTopWidth: 3,
          borderTopColor: "#64CEC2",
          height: 64,
          paddingTop: 2,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontFamily: "Bold",
          fontSize: 14,
          textShadowColor: "#64CEC2",
          textShadowRadius: 0,
          textShadowOffset: { width: 0, height: 10 },
        },
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 3,
          borderBottomColor: "#64CEC2",
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
            <MaterialIcons
              name="arrow-back"
              size={32}
              color={colours.light.text}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="events/index"
        options={{
          href: "/events",
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
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.iconContainer,
                color === "#8A3FC3" && styles.activeIcon,
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
                color === "#8A3FC3" && styles.activeIcon,
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
                color === "#8A3FC3" && styles.activeIcon,
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
                color === "#8A3FC3" && styles.activeIcon,
              ]}
            >
              <ProfileIcon width={32} height={32} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events/event"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="events/map"
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
    color: colours.light.text,
  },

  headerTitleShadow: {
    position: "absolute",
    fontSize: 28,
    fontFamily: "Bold",
    color: "#64CEC2",
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
    // stroke: "#64CEC2", // Outline color when active
  },
});
