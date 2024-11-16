import { useNavigation, useFocusEffect } from "expo-router";
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
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const categories = {
    all: "all",
    events: "events",
    accounts: "accounts",
  };

  const [category, setCategory] = useState(categories.all);

  const [filterPredicates, setFilterPredicates] = useState({
    eventsInFuture: {
      isEnabled: false,
      predicateFn: (e) => new Date(e.end) > new Date(),
    },
    EventsWith_S_inTitle: {
      isEnabled: false,
      predicateFn: (e) => e.title.toLowerCase().includes("s"),
    },
    EventsWithDefinedColour: {
      isEnabled: false,
      predicateFn: (e) => !!e.color,
    },
    EventsWithImage: {
      isEnabled: false,
      predicateFn: (e) => !!e.image,
    },
    // TODO otherpredicates that are actually useful
  });

  const [sortComparators, setSortComparators] = useState({
    sortByStartTime: {
      isEnabled: false,
      comparatorFn: (a, b) => new Date(a.start) - new Date(b.start), // Sorts events by start time in ascending order
    },
    sortByTitle: {
      isEnabled: false,
      comparatorFn: (a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    },
    // Todo other comparators
  });

  const [filterdEvents, setFilteredEvents] = useState([]);

  const getEventsFromAsyncStorage = async () => {
    const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
    if (!storedEvents) {
      setEvents(defaultEvents);
      setFilteredEvents(defaultEvents);
      await AsyncStorage.setItem(
        EVENTS_STORE_KEY,
        JSON.stringify(defaultEvents)
      );
    } else {
      setEvents(JSON.parse(storedEvents));
      setFilteredEvents(JSON.parse(storedEvents));
    }
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
    let updatedEvents = events.filter((event) =>
      Object.values(filterPredicates)
        .filter((x) => x.isEnabled)
        .every(({ predicateFn }) => predicateFn(event))
    );

    if (searchInput !== "") {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    Object.values(sortComparators)
      .filter((x) => x.isEnabled)
      .forEach(({ comparatorFn }) => {
        updatedEvents.sort(comparatorFn);
      });

    setFilteredEvents(updatedEvents);
  }, [searchInput, filterPredicates, sortComparators, events]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search Screen</Text>
      <TextInput
        placeholder="Search"
        defaultValue={""}
        onChangeText={(x) => setSearchInput(x)}
      />
      <Text>Categories!!!!!!!!!!!!!</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        {Object.values(categories).map((x, index) => (
          <Pressable
            key={index}
            style={{
              shadowColor: "#64CEC2",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 6,
              backgroundColor: x !== category ? "#F7F7F7" : "purple",
              borderRadius: 28,
              padding: 10,
              justifyContent: "center",
            }}
            onPress={() => setCategory(x)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text numberOfLines={1}>{x}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Text>Filtering!!!</Text>
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

      <Text>SOrting one at a time!!</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        {Object.entries(sortComparators).map(
          ([comparatorKey, { isEnabled }], index) => (
            <Pressable
              key={index}
              style={{
                shadowColor: "#64CEC2",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 0,
                elevation: 6,
                backgroundColor: !isEnabled ? "#F7F7F7" : "blue",
                borderRadius: 28,
                padding: 10,
                justifyContent: "center",
              }}
              onPress={() =>
                setSortComparators((prev) => {
                  const newComparators = Object.fromEntries(
                    Object.entries(prev).map(([key, value]) => [
                      key,
                      {
                        ...value,
                        isEnabled:
                          key === comparatorKey ? !value.isEnabled : false,
                      },
                    ])
                  );
                  return newComparators;
                })
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text numberOfLines={1}>{comparatorKey}</Text>
              </View>
            </Pressable>
          )
        )}
      </View>

      <Text>Results</Text>

      {(category == categories.all || category == categories.events) && (
        <>
          <Text>Events</Text>
          <ScrollView
            horizontal={false}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 50,
              padding: 10,
              width: "100%",
            }}
          >
            <View style={{ gap: 10, padding: 10, width: "100%" }}>
              {filterdEvents.map((params, index) => (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate("events/event", params)}
                >
                  <View
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
                        style={{
                          color: "#006D62",
                          fontFamily: "Bold",
                          fontSize: 30,
                        }}
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
                        <Ionicons
                          name="location-sharp"
                          size={24}
                          color="#006D62"
                        />
                        <Text style={{ color: "#006D62" }} numberOfLines={3}>
                          {!params.location
                            ? "undefined location"
                            : params.location}
                          {`\n ${params.latitude + " , " + params.longitude}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {(category == categories.all || category == categories.accounts) && (
        <>
          <Text>Accounts</Text>
          <Text>Some Accounts should be here???</Text>
        </>
      )}
    </View>
  );
}
