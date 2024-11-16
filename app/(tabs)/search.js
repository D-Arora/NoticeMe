import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { defaultEvents, EVENTS_STORE_KEY } from "./events";

export default function Search() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterdEvents, setFilteredEvents] = useState([]);
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
    if (searchInput == "") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(x => x.title.toLowerCase().includes(searchInput.toLowerCase())));
    }
  }, [searchInput])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search Screen</Text>
      <TextInput placeholder="Search" defaultValue={""} onChangeText={x => setSearchInput(x)}/>

      <View style={{ display: "flex", flexDirection: "column", gap: "10" }}>
        {filterdEvents.map((x) => (
          <View>{JSON.stringify(x)}</View>
        ))}
      </View>
    </View>
  );
}
