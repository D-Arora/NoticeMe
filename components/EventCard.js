import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import colours from "../colours";
import { getImageDominantColor } from "../helpers/averageColour";
import DefaultImage from "../assets/images/mesh-898.png";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const formatDate = (dateString) => {
  const date = dayjs(dateString);
  return date.format("Do MMM");
};

const EventCard = ({
  id,
  eventName,
  societyName,
  colour,
  start,
  end,
  description,
  location,
  imageSource,
  longitude,
  latitude,
}) => {
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState(
    colours.light.primaryPurple
  );

  useEffect(() => {
    const extractColor = async () => {
      try {
        let uri = imageSource || Image.resolveAssetSource(DefaultImage).uri;
        const dominantColor = colour || (await getImageDominantColor(uri));
        setBackgroundColor(dominantColor);
      } catch (error) {
        console.error("Error extracting color:", error);
        setBackgroundColor(colours.light.primaryPurple);
      }
    };
    extractColor();
  }, [imageSource, colour]);

  const formattedDate = formatDate(start);

  const handlePress = () => {
    // console.log("Card pressed with data:", {
    //   id,
    //   eventName,
    //   start,
    //   end,
    //   location,
    //   longitude,
    //   latitude,
    //   imageSource,
    // });

    const params = {
      id: id?.toString(),
      eventName: eventName,
      societyName: societyName,
      start: start?.toString(),
      end: end?.toString(),
      location: location,
      description: description,
      longitude: longitude?.toString(),
      latitude: latitude?.toString(),
      image: imageSource,
      color: backgroundColor,
    };

    // console.log("Navigation params:", params);

    router.push({
      pathname: "/events/event",
      params,
    });
  };

  useEffect(() => {
    console.log("EventCard rendered with id:", id, "and name:", eventName);
  }, [id, eventName]);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      testID={`event-card-${id}`}
    >
      {/* Pseudoshadow */}
      <View style={styles.shadow} />

      {/* Main Card View */}
      <View style={styles.card}>
        {/* Image */}
        <Image
          source={{ uri: imageSource || DefaultImage }}
          style={styles.image}
        />
        {/* Text Section */}
        <View style={[styles.textContainer, { backgroundColor }]}>
          <Text style={styles.title}>{`${eventName}`}</Text>
          <Text
            style={styles.subtitle}
          >{`${formattedDate} | ${location}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    aspectRatio: 4 / 6,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 5,
    backgroundColor: colours.light.highlightGreen,
    zIndex: -1,
    borderRadius: 16,
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 5,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 3,
  },
  textContainer: {
    position: "relative",
    height: 110,
    top: -40,
    paddingBottom: 20,
    paddingTop: 50,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 3,
    zIndex: -1,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
    textAlign: "center",
    lineHeight: 18,
  },
  subtitle: {
    fontFamily: "Regular",
    fontSize: 14,
    color: "white",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default EventCard;
