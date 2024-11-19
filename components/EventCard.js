import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colours from "../colours";
import { getImageDominantColor } from "../helpers/averageColour";
import DefaultImage from "../assets/images/mesh-898.png";

const EventCard = ({ eventName, societyName, date, location, imageSource }) => {
  const [backgroundColor, setBackgroundColor] = useState(
    colours.light.primaryPurple
  );

  useEffect(() => {
    const extractColor = async () => {
      try {
        let uri;
        if (imageSource?.uri) {
          uri = imageSource.uri;
        } else {
          uri = Image.resolveAssetSource(imageSource || DefaultImage).uri;
        }

        console.log("URI: " + uri);

        const dominantColor = await getImageDominantColor(uri);
        console.log(dominantColor);

        setBackgroundColor(dominantColor);
      } catch (error) {
        console.error("Error extracting color:", error);
        setBackgroundColor(colours.light.primaryPurple);
      }
    };

    extractColor();
  }, [imageSource]);

  return (
    <View style={styles.cardContainer}>
      {/* Pseudoshadow */}
      <View style={styles.shadow} />

      {/* Main Card View */}
      <View style={styles.card}>
        {/* Image */}
        <Image source={imageSource || DefaultImage} style={styles.image} />
        {/* Text Section */}
        <View style={[styles.textContainer, { backgroundColor }]}>
          <Text style={styles.title}>{`${societyName} - ${eventName}`}</Text>
          <Text style={styles.subtitle}>{`${date} | ${location}`}</Text>
        </View>
      </View>
    </View>
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
    top: -40,
    padding: 16,
    paddingTop: 50,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 3,
    zIndex: -1,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 18,
    color: "white",
    marginBottom: 4,
    flexShrink: 1,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Regular",
    fontSize: 16,
    color: "white",
    flexShrink: 1,
    textAlign: "center",
  },
});

export default EventCard;
