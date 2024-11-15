import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import colours from "../colours";
import Accept from "../assets/icons/AcceptIcon.svg";  // Make sure you're using react-native-svg-transformer
import Decline from "../assets/icons/DeclineIcon.svg"; // Make sure you're using react-native-svg-transformer
import AlertCard from "./AlertCard"; // Adjust the import path as needed

const PendingRequest = ({ name, members, onAccept, onDecline }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const handleAccept = () => {
    showAlert(`${name}'s follow request has been accepted.`, 'success');
    onAccept();
  };

  const handleDecline = () => {
    showAlert(`${name}'s follow request has been declined.`, 'error');
    onDecline();
  };

  return (
    <View style={styles.container}>
      <AlertCard
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)} // Close alert
      />
      <View style={styles.boxContainer}>
        <View style={styles.profilePicture}></View>
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.membersText}>{members}</Text>
        </View>

        <TouchableOpacity onPress={handleAccept}>
          <Accept width={40} height={40} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDecline}>
          <Decline width={40} height={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  boxContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: colours.light.primary,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
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
  membersText: {
    fontSize: 12,
    color: "gray",
  },
});

export default PendingRequest;

