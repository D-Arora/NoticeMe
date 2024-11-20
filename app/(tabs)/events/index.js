import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import FloatingButton from "../../../components/FloatingButton";
import EventCarousel from "../../../components/EventCarousel";
import BackgroundImage from "../../../assets/images/mesh-898.png";
import sampleEvents from "./sampleEvents.json";
import colours from "../../../colours";
import { useNavigation, useFocusEffect } from "expo-router";

const EVENTS_STORE_KEY = "@events";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const navigation = useNavigation();

  const isThisWeek = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    return eventDate >= now && eventDate <= oneWeekFromNow;
  };

  const thisWeekEvents = events.filter((event) => isThisWeek(event.start));
  const upcomingWeekEvents = events.filter((event) => !isThisWeek(event.start));

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      if (storedEvents) {
        let eventsList = JSON.parse(storedEvents);
        eventsList = eventsList.sort(
          (a, b) => new Date(a.start) - new Date(b.start)
        );
        setEvents(eventsList);
      } else {
        const sortedSampleEvents = sampleEvents.sort(
          (a, b) => new Date(a.start) - new Date(b.start)
        );
        setEvents(sortedSampleEvents);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem(EVENTS_STORE_KEY, JSON.stringify(events));
      } catch (error) {
        console.error("Failed to save events:", error);
      }
    };
    if (events.length) saveEvents();
  }, [events]);

  const handleAddEvent = () => {
    navigation.navigate("events/createEvent");
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      imageStyle={{ opacity: 0.16 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.textContainer}>
          <View style={styles.rightOutline} />
          <View style={styles.leftOutline} />
          <View style={styles.foregroundView}>
            <Text style={styles.titleText}>This Week</Text>
          </View>
        </View>

        <PanGestureHandler
          onGestureEvent={() => setScrollEnabled(false)}
          onEnded={() => setScrollEnabled(true)}
        >
          <View>
            <EventCarousel cards={thisWeekEvents} />
          </View>
        </PanGestureHandler>

        <View style={styles.textContainer}>
          <View style={styles.rightOutline} />
          <View style={styles.leftOutline} />
          <View style={styles.foregroundView}>
            <Text style={styles.titleText}>Upcoming Weeks</Text>
          </View>
        </View>

        <PanGestureHandler
          onGestureEvent={() => setScrollEnabled(false)}
          onEnded={() => setScrollEnabled(true)}
        >
          <View>
            <EventCarousel cards={upcomingWeekEvents} />
          </View>
        </PanGestureHandler>
      </ScrollView>

      <FloatingButton
        IconComponent={Entypo}
        iconName="plus"
        iconSize={40}
        iconColor="white"
        onPress={handleAddEvent}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  textContainer: {
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  rightOutline: {
    position: "absolute",
    width: 220,
    height: 60,
    borderRadius: 30,
    backgroundColor: colours.light.buttonGreen,
    right: 30,
  },
  leftOutline: {
    position: "absolute",
    width: 220,
    height: 60,
    borderRadius: 30,
    backgroundColor: colours.light.highlightGreen,
    left: 30,
  },
  foregroundView: {
    width: 220,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colours.light.primaryGreen,
  },
  titleText: {
    fontFamily: "Bold",
    fontSize: 24,
    color: colours.light.text,
    lineHeight: 24,
  },
});
