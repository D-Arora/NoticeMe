import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import EventCard from "./EventCard";

const windowWidth = Dimensions.get("window").width;
const cardWidth = 280; // Card width
const cardPadding = 20; // Padding between cards

const EventCarousel = ({ cards }) => {
  // Basic render function for EventCard
  const renderEventCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <EventCard
        eventName={item.eventName}
        societyName={item.societyName}
        date={item.date}
        location={item.location}
        imageSource={item.imageSource}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={cardWidth + cardPadding} // Card width plus padding
        height={"auto"}
        data={cards}
        renderItem={renderEventCard}
        snapEnabled={true}
        mode="horizontal"
        loop={true}
        style={styles.carousel}
      />
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
    marginHorizontal: cardPadding / 2, // Add padding evenly on both sides
  },
});

export default EventCarousel;
