import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import colours from "../../../colours";

export default function Event() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("events/index")}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
    if (params.id) {
      setEvent(params);
    }
  }, [params.id]);

  const formatEventTime = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    return `${startDate.format("HH:mm")} to ${endDate.format(
      "HH:mm"
    )} - ${startDate.format("ddd, MMM Do")}`;
  };

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Regular" }}>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View
        style={{
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              !event.image
                ? require("../../../assets/images/mesh-898.png")
                : { uri: event.image }
            }
          />
        </View>
        <Text style={[styles.heading, { color: event.color }]}>
          {event.eventName}
        </Text>
        <Text style={styles.societyName}>{event.societyName}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons
              name="access-time"
              size={24}
              color={colours.light.text}
            />
            <Text style={styles.infoText}>
              {formatEventTime(event.start, event.end)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons
              name="location-on"
              size={24}
              color={colours.light.text}
            />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <MaterialIcons name="info" size={24} color={colours.light.text} />
            <Text style={styles.descriptionText}>
              {event.description || "No description available"}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/events/map",
                params: event,
              })
            }
          >
            <Text style={styles.buttonText}>View on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/events")}
          >
            <Text style={styles.buttonText}>Back to Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 360,
    height: (360 * 5) / 4,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    borderWidth: 4,
    borderColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 24,
    fontFamily: "Bold",
  },
  societyName: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 10,
    color: colours.light.text,
  },
  infoContainer: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: colours.light.highlightGreen,
    // gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colours.light.highlightGreen,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colours.light.primaryGreen,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    // borderRadius: 40,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "Regular",
    color: colours.light.text,
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    backgroundColor: colours.light.highlightGreen,
    borderRadius: 20,
    minHeight: 100,
    borderColor: colours.light.primaryGreen,
    borderWidth: 4,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: "Regular",
    color: colours.light.text,
    flex: 1,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#006e62",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 16,
  },
});
