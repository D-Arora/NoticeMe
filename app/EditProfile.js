// app/EditProfile.js or app/profile/EditProfile.js
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import BackgroundGradient from '../assets/images/BackgroundGradient.svg';
import colours from '../colours';
import StyledButton from '../components/StyledButton';

export default function EditProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <BackgroundGradient style={styles.background} />
      <View style={{ borderBottomWidth: 4, borderBottomColor: "#64CEC2"}}>
        <Text style={styles.heading1}>Edit Profile</Text>
      </View>
      <StyledButton title="Save Changes" colourChange={false}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heading1: {
    fontSize: 30,
    color: colours.light.text,
    marginBottom: 10,   
  },
  heading2: {
    fontSize: 20,
    color: colours.light.text,
    marginBottom: 20,
  }
});
