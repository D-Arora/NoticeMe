import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colours from "../colours";

const Tag = ({ title, colour, clickable, onPress, disabled }) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    if (clickable) {
      setSelected(!selected);
      if (onPress) {
        onPress(); 
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: selected && !disabled ? colours.light.secondary : colour,
          opacity: selected && !disabled? 1 : 0.8,
          borderColor: colours.light.primary,
          borderWidth: selected ? 3 : 0,
        },
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: '30%',
    margin: 5,
    marginVertical: 7
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tag;
