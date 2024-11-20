import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colours from "../colours";
import StyledButton from './StyledButton';

const ProfileInterface = ({ onPress, name, members, role }) => {
  return (
    <View onPress={onPress} style={styles.boxContainer}>
      <View style={styles.profilePicture}></View>
      <View style={styles.profileInfo}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.membersText}>{members}</Text>
      </View>
      <View>
        <StyledButton title={role}></StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: colours.light.primary,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  shadowContainer: {
    shadowColor: colours.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colours.light.primary,
  },
  profileInfo: {
    marginLeft: 10,
    flex: 1,
},
  nameText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ProfileInterface;
