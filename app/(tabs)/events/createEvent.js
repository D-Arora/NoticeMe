import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledButton from "../../../components/StyledButton";
import colours from "../../../colours";
import DefaultImage from "../../../assets/images/mesh-898.png";
import { MiniMap } from "../../../components/MiniMap";
import { randomUUID } from "expo-crypto";

const EVENTS_STORE_KEY = "@events";

const formatDateTime = (date) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const timeString = date.toLocaleTimeString([], options);
  const dateString = date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
  return `${timeString} - ${dateString}`;
};

export default function createEvent() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState({
    latitude: -33.9173,
    longitude: 151.2313,
  });
  const [imageSource, setImageSource] = useState(null);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !eventName ||
      !societyName ||
      !description ||
      !locationName ||
      !location.latitude ||
      !location.longitude ||
      !imageSource
    ) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    const newEvent = {
      id: randomUUID(), // Use UUID for unique ID generation
      eventName,
      societyName,
      description,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      locationName,
      latitude: location.latitude,
      longitude: location.longitude,
      location: locationName,
      imageSource,
      tags: [],
      comments: [],
    };

    try {
      const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      const events = storedEvents ? JSON.parse(storedEvents) : [];
      events.push(newEvent);
      await AsyncStorage.setItem(EVENTS_STORE_KEY, JSON.stringify(events));
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save the event.");
      console.error("Failed to save the event:", error);
    }
  };

  const showStartTimePicker = () => setStartTimePickerVisible(true);
  const hideStartTimePicker = () => setStartTimePickerVisible(false);
  const handleStartTimeConfirm = (date) => {
    setStartTime(date);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => setEndTimePickerVisible(true);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);
  const handleEndTimeConfirm = (date) => {
    setEndTime(date);
    hideEndTimePicker();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });
    setLoading(false);

    if (!result.cancelled && result.assets?.length > 0) {
      setImageSource(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Society Name"
        value={societyName}
        onChangeText={setSocietyName}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Location Name"
        value={locationName}
        onChangeText={setLocationName}
      />

      <StyledButton title="Select Start Time" onPress={showStartTimePicker} />
      <Text>{formatDateTime(startTime)}</Text>

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="datetime"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />

      <StyledButton title="Select End Time" onPress={showEndTimePicker} />
      <Text>{formatDateTime(endTime)}</Text>

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="datetime"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />

      <MiniMap
        location={location}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      />

      <StyledButton title="Pick Event Image" onPress={pickImage} />
      <Image
        source={{
          uri: imageSource || Image.resolveAssetSource(DefaultImage).uri,
        }}
        style={styles.imagePreview}
        resizeMode="cover"
      />

      <StyledButton title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Bold",
    marginBottom: 20,
    color: colours.light.text,
  },
  input: {
    height: 40,
    borderColor: colours.light.highlightGreen,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 40,
  },
  descriptionInput: {
    height: 120,
    borderColor: colours.light.highlightGreen,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 20,
  },
  map: {
    height: 200,
    marginBottom: 15,
    borderRadius: 40,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 40,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});
