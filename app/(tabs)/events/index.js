import {
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import StyledButton from "../../../components/StyledButton";
import { StickerText } from "../../../components/StickerText";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { CreateEventModal } from "../../../components/CreateEventModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { CreateEventModal } from "./CreateEventModal";

export const EVENTS_STORE_KEY = "@events";

export const defaultEvents = [
  {
    title: "Yesterday's event",
    image: "https://pbs.twimg.com/media/GYIsHsVbQAAElEQ?format=png&name=medium",
    start: dayjs().add(-1, "day").set("hour", 10).set("minute", 0).toDate(),
    end: dayjs().add(-1, "day").set("hour", 10).set("minute", 30).toDate(),
    color: "cyan",
    latitude: -33.85652154,
    longitude: 151.215339612,
    location: "Sydney Opera House, Sydney",
  },
  {
    title: "Meeting",
    image: "https://pbs.twimg.com/media/Gatqoa5aoAA1tqA?format=jpg&name=medium",
    start: dayjs().set("hour", 10).set("minute", 0).toDate(),
    end: dayjs().set("hour", 10).set("minute", 30).toDate(),
    color: "#008033",
    latitude: -33.85652154,
    longitude: 151.215339612,
    location: "Sydney Opera House, Sydney",
  },
  {
    title: "UNSW Library Study Session",
    image: "https://pbs.twimg.com/media/GYNX098akAEL6_g?format=jpg&name=medium",
    start: dayjs().set("hour", 10).set("minute", 0).toDate(),
    end: dayjs().set("hour", 10).set("minute", 30).toDate(),
    color: "red",
    latitude: -33.91725324897,
    longitude: 151.23343108372,
    location: "UNSW Library",
  },
  {
    title: "Coffee Break",
    start: dayjs().set("hour", 14).set("minute", 30).toDate(),
    end: dayjs().set("hour", 15).set("minute", 0).toDate(),
    latitude: -33.8731,
    longitude: 151.2065,
    location: "The Grounds of the City, Sydney",
  },
  {
    title: "Lunch with Client",
    start: dayjs().set("hour", 12).set("minute", 0).toDate(),
    end: dayjs().set("hour", 13).set("minute", 30).toDate(),
    latitude: -33.8728,
    longitude: 151.2051,
    location: "Queen Victoria Building, Sydney",
  },
  {
    title: "Team Meeting",
    start: dayjs().set("hour", 16).set("minute", 0).toDate(),
    end: dayjs().set("hour", 16).set("minute", 45).toDate(),
    color: "#ffe9ab",
    latitude: -33.8683,
    longitude: 151.2195,
    location: "Barangaroo Reserve, Sydney",
  },
  {
    title: "Dinner with Friends",
    start: dayjs().set("hour", 19).set("minute", 0).toDate(),
    end: dayjs().set("hour", 21).set("minute", 0).toDate(),
    latitude: -33.8748,
    longitude: 151.2003,
    location: "Darling Harbour, Sydney",
  },
  {
    title: "Morning Run",
    start: dayjs().add(1, "day").set("hour", 6).set("minute", 0).toDate(),
    end: dayjs().add(1, "day").set("hour", 7).set("minute", 0).toDate(),
    latitude: -33.8707,
    longitude: 151.2094,
    location: "Hyde Park, Sydney",
  },
  {
    title: "Client Presentation",
    start: dayjs().add(1, "day").set("hour", 10).set("minute", 30).toDate(),
    end: dayjs().add(1, "day").set("hour", 11).set("minute", 30).toDate(),
    color: "#e9b5f7",
    latitude: -33.8611,
    longitude: 151.2106,
    location: "Museum of Contemporary Art, Sydney",
  },
  {
    title: "Visit Art Gallery",
    start: dayjs().add(2, "day").set("hour", 14).set("minute", 0).toDate(),
    end: dayjs().add(2, "day").set("hour", 15).set("minute", 30).toDate(),
    latitude: -33.8682,
    longitude: 151.2173,
    location: "Art Gallery of New South Wales, Sydney",
  },
  {
    title: "Yoga Class",
    start: dayjs().add(2, "day").set("hour", 18).set("minute", 0).toDate(),
    end: dayjs().add(2, "day").set("hour", 19).set("minute", 0).toDate(),
    latitude: -33.8572,
    longitude: 151.2153,
    location: "Royal Botanic Garden, Sydney",
  },
  {
    title: "Weekend Market Visit",
    start: dayjs().add(3, "day").set("hour", 9).set("minute", 0).toDate(),
    end: dayjs().add(3, "day").set("hour", 11).set("minute", 0).toDate(),
    latitude: -33.8792,
    longitude: 151.2057,
    location: "Paddy's Markets, Haymarket, Sydney",
  },
];

export default function Events() {
  const navigation = useNavigation();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pushEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            setEvents(defaultEvents);
          }}
          style={{
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>Clear AsyncStorage</Text>
          <Ionicons name="trash" size={32} color="red" />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    const getEventsFromAsyncStorage = async () => {
      const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      if (!storedEvents) {
        setEvents(defaultEvents);
        await AsyncStorage.setItem(
          EVENTS_STORE_KEY,
          JSON.stringify(defaultEvents)
        );
      } else {
        setEvents(JSON.parse(storedEvents));
      }
    };

    getEventsFromAsyncStorage();
  }, []);

  useEffect(() => {
    const saveEventsToAsyncStorage = async () => {
      await AsyncStorage.setItem(EVENTS_STORE_KEY, JSON.stringify(events));
    };

    saveEventsToAsyncStorage();
  }, [events]);

  return (
    <View style={styles.container}>
      <StickerText text="Event Details" fontFamily="Regular" fontSize={40} />
      <ScrollView>
        <View style={{ gap: 10 }}>
          {events.map((x, index) => (
            <StyledButton
              key={index}
              title={x.title}
              colour={x.color}
              shadowColour={["black", "green", "red", "blue"][index % 4]}
              onPress={() =>
                router.push({
                  pathname: "events/event",
                  params: {
                    title: x.title,
                    image: x.image,
                    start: x.start,
                    end: x.end,
                    color: x.color,
                    latitude: x.latitude,
                    longitude: x.longitude,
                    location: x.location,
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <CreateEventModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onSubmit={pushEvent}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  floatingButtonShadow: {
    position: "absolute",
    right: 20,
    bottom: 15,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#A0D8D1",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#3fc3ad",
    justifyContent: "center",
    alignItems: "center",
  },
});
