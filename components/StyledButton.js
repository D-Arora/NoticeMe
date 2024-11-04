import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";

const StyledButton = ({ onPress, title }) => {
    return (
            <TouchableOpacity onPress={onPress} style={styles.shadowContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    shadowContainer: {
      shadowColor: colours.light.primary,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },
    button: {
      backgroundColor: colours.light.secondary,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });

export default StyledButton;