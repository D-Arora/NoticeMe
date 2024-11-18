import React from "react";
import { View, StyleSheet, Text, te } from "react-native";
import colours from "../colours";

const CommentCard = ({ onPress, name, time, comment }) => {
  return (
    <View onPress={onPress} style={styles.shadowContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.cardThumbnail}>
          {/* Thumbnail or image content can go here if needed */}
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardDetails}>
            <Text style={styles.smallText}>{name}</Text>
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <View>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: colours.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  cardContainer: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  cardThumbnail: {
    flex: 1,
  },
  cardInfo: {
    flex: 3,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallText: {
    fontSize: 12,
    color: colours.light.text,
  },
  commentText: {
    fontSize: 20,
    color: colours.light.text,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CommentCard;
