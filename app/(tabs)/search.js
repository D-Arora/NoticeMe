import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { defaultEvents, EVENTS_STORE_KEY } from "./events";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // an array of functions that takes an event and returns a bool
  // const [filterPredicate, setFilterPredicate] = useState([(e) => true]);

  const [filterPredicates, setFilterPredicates] = useState({
    eventsInFuture: {
      isEnabled: false,
      predicateFn: (e) => new Date(e.end) > new Date(),
    },
    EventsWithSinTitle: {
      isEnabled: false,
      predicateFn: (e) => e.title.toLowerCase().includes("s"),
    },
    EventsWithADefinedColour: {
      isEnabled: false,
      predicateFn: (e) => !!e.color,
    },
    EventsWithAImage: {
      isEnabled: false,
      predicateFn: (e) => !!e.image,
    },
  });

  const [filterdEvents, setFilteredEvents] = useState([]);

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

    setFilteredEvents(events);
  };

  useEffect(() => {
    getEventsFromAsyncStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Invoked whenever the route is focused. (incase asyncstorage has changed)
      getEventsFromAsyncStorage();

      // Return function is invoked whenever the route gets out of focus.
      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

  useEffect(() => {
    if (searchInput == "") {
      setFilteredEvents(
        events.filter((event) =>
          Object.values(filterPredicates)
            .filter((x) => x.isEnabled)
            .every(({ predicateFn }) => predicateFn(event))
        )
      );
    } else {
      setFilteredEvents(
        events.filter(
          (event) =>
            event.title.toLowerCase().includes(searchInput.toLowerCase()) &&
            Object.values(filterPredicates)
              .filter((x) => x.isEnabled)
              .every(({ predicateFn }) => predicateFn(event))
        )
      );
    }
  }, [searchInput, filterPredicates]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search Screen</Text>
      <TextInput
        placeholder="Search"
        defaultValue={""}
        onChangeText={(x) => setSearchInput(x)}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        {Object.entries(filterPredicates).map(
          ([predicateKey, { isEnabled }], index) => (
            <Pressable
              key={index}
              style={{
                shadowColor: "#64CEC2",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 0,
                elevation: 6,
                backgroundColor: !isEnabled ? "#F7F7F7" : "red",
                borderRadius: 28,
                padding: 10,
                justifyContent: "center",
              }}
              onPress={() =>
                setFilterPredicates((prev) => ({
                  ...prev,
                  [predicateKey]: {
                    ...prev[predicateKey],
                    isEnabled: !filterPredicates[predicateKey].isEnabled,
                  },
                }))
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text numberOfLines={1}>{predicateKey}</Text>
              </View>
            </Pressable>
          )
        )}
      </View>

      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
          padding: 10,
        }}
      >
        <View style={{ gap: 10, padding: 10 }}>
          {filterdEvents.map((params, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderRadius: 28,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
                width: "100%",
                gap: 10,
                shadowColor: !params.color ? "grey" : params.color,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 0,
                elevation: 6,
                padding: 10,
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 20 }}
                resizeMode="cover"
                source={
                  !params.image
                    ? require("../../assets/adaptive-icon.png")
                    : { uri: params.image }
                }
              />
              <View style={{ overflow: "scroll", flexShrink: 1 }}>
                <Text
                  style={{ color: "#006D62", fontFamily: "Bold", fontSize: 30 }}
                  numberOfLines={1}
                >
                  {!params.title ? "undefined title" : params.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time" size={24} color="#006D62" />
                  <Text style={{ color: "#006D62" }} numberOfLines={1}>
                    {!params.start ? "undefined start" : params.start}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="location-sharp" size={24} color="#006D62" />
                  <Text style={{ color: "#006D62" }} numberOfLines={3}>
                    {!params.location ? "undefined location" : params.location}
                    {`\n ${params.latitude + " , " + params.longitude}`}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
