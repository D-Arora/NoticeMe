import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colours from "../colours";

const Tag = ({title, colour, clickable}) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    if (clickable) {
      setSelected(!selected);
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, {backgroundColor: colour, borderColor: selected ? 'white' : 'transparent', borderWidth: selected ? 3 : 0}]}>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tag;
