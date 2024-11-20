import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
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
  eventName,
  societyName,
  colour,
  start,
  location,
  imageSource,
}) => {
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
  }, [imageSource]);

  const formattedDate = formatDate(start);

  return (
    <TouchableOpacity style={styles.cardContainer}>
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
