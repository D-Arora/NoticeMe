// CreateEventModal.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const defaultEvent = {
  title: 'title',
  start: new Date(),
  end: new Date(),
  color: "#7ad1c2",
  latitude: -33.85652154,
  longitude: 151.215339612,
  location: "Sydney Opera House, Sydney",
};

export const CreateEventModal = ({ isVisible, setIsVisible, onSubmit }) => {
  const router = useRouter();
  const [event, setEvent] = useState({});

  const updateEvent = (key, value) => {
    setEvent({ ...event, [key]: value });
  };

  const submitEvent = () => {
    const eventObj = event;
    for (const [key, defaultValue] of Object.entries(defaultEvent)) {
      if (!eventObj[key]) {
        eventObj[key] = defaultValue;
      }
    }
    onSubmit(eventObj);
    setIsVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            // margin: 20,
            backgroundColor: "white",
            height: "90%",
            width: "100%",
            opacity: 1,
          }}
        >
          {/* Modal Header */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: "#F7F7F7",
            }}
          >
            <Pressable onPress={() => setEvent({}) & setIsVisible(false)}>
              <View>
                <Text style={{ color: "red" }}> Cancel</Text>
              </View>
            </Pressable>
            <Text>Create Event</Text>
            <Pressable
              onPress={submitEvent}
            >
              <View>
                <Text style={{ color: "blue" }}> Done</Text>
              </View>
            </Pressable>
          </View>
          {/* Modal Body */}
          <ScrollView style={{ padding: 20 }}>
            <Text>Event Title</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter event title"
              value={event.title}
              onChangeText={(text) => updateEvent("title", text)}
            />

            <Text>Image URL</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter image URL"
              value={event.image}
              onChangeText={(text) => updateEvent("image", text)}
            />

            <Text>Start Date</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter start date (e.g., YYYY-MM-DD)"
              value={event.start}
              onChangeText={(text) => updateEvent("start", new Date(text))}
            />

            <Text>End Date</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter end date (e.g., YYYY-MM-DD)"
              value={event.end}
              onChangeText={(text) => updateEvent("end", new Date(text))}
            />

            <Text>Color</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter color to reduce the number of clicks users need to input, colour will be calculated automatically as the average colour of the image they input"
              value={event.color}
              onChangeText={(text) => updateEvent("color", text)}
            />

            <Text>Latitude</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter latitude"
              value={event.latitude}
              keyboardType="numeric"
              onChangeText={(text) => updateEvent("latitude", text)}
            />

            <Text>Longitude</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter longitude"
              value={event.longitude}
              keyboardType="numeric"
              onChangeText={(text) =>
                updateEvent("longitude", text)
              }
            />

            <Text>Location</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Enter location"
              value={event.location}
              onChangeText={(text) => updateEvent("location", text)}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    color: "red",
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
