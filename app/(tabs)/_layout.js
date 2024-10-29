import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import EventsIcon from "../../assets/icons/events.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ActivityIcon from "../../assets/icons/activity.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

export default function TabsLayout() {
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
          fontFamily: "Regular",
          fontSize: 14,
        },
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
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
