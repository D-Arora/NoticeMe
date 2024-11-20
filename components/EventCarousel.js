import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import EventCard from "./EventCard";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

// Configure Reanimated Logger
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const windowWidth = Dimensions.get("window").width;
const cardWidth = 280;
const cardPadding = 20;

const EventCarousel = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderEventCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <EventCard
        eventName={item.eventName}
        societyName={item.societyName}
        start={item.start}
        location={item.location}
        imageSource={item.imageSource}
        colour={item.colour}
      />
    </View>
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {cards.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={cardWidth + cardPadding}
        height={450}
        data={cards}
        renderItem={renderEventCard}
        pagingEnabled={true}
        snapEnabled={true}
        mode="horizontal"
        loop={true}
        style={styles.carousel}
        onSnapToItem={(index) => setActiveIndex(index)} // Update active index
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    width: windowWidth,
    justifyContent: "center",
  },
  cardContainer: {
    width: cardWidth,
    marginHorizontal: cardPadding / 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  activeDot: {
    backgroundColor: "#3fc3ad", // Active dot color
  },
  inactiveDot: {
    backgroundColor: "#cccccc", // Inactive dot color
  },
});

export default EventCarousel;
