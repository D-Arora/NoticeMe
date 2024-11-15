import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import colours from '../colours';

const AlertCard = ({ message, type, visible, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        }, 3000); // Duration the alert stays visible (3 seconds)
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.alertCard,
        { opacity: fadeAnim, backgroundColor: type === 'success' ? colours.light.success : colours.light.error },
      ]}
    >
      <View style={styles.alertContent}>
        <Text style={styles.alertText}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    width: 250,
    padding: 15,
    backgroundColor: 'white',  // White background for the alert card
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colours.light.primary,  // Border color for the white card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 1000,
  },
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  closeButton: {
    backgroundColor: colours.light.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AlertCard;

