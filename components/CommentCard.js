import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colours from "../colours";

const CommentCard = ({ onPress, name, time, comment, description }) => {
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
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: colours.light.primaryGreen,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  cardContainer: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: "white",
    flexDirection: 'row',
    marginBottom: 20,
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
    fontSize: 10,
    color: colours.light.text
  },
  commentText: {
    fontSize: 14,
    color: colours.light.text,
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colours.light.text,
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

export default CommentCard;
