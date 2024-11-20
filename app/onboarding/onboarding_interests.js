import React from "react";
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import StyledButton from "../../components/StyledButton";
import Tag from "../../components/Tag";
import colours from "../../colours";
import StepBar from "../../components/StepBar";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";

export default function OnboardingInterests() {
  const router = useRouter();
  const navigation = useNavigation();

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interestList = [
    "Free Food",
    "Engineering",
    "UX Design",
    "Reading",
    "Fitness",
    "Bouldering",
    "Music",
    "Networking",
    "Mentorship",
    "Ice Skating",
    "Arts",
    "Fashion",
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove the interest if already selected
      setSelectedInterests((prev) =>
        prev.filter((item) => item !== interest)
      );
    } else if (selectedInterests.length < 4) {
      // Add the interest if below the limit
      setSelectedInterests((prev) => [...prev, interest]);
    } else {
      Alert.alert("Maximum of 4 interests can be selected.");
    }
  };

  const generateInterests = interestList.map((interest, index) => {
    const isSelected = selectedInterests.includes(interest);

    return (
      <Tag
        key={index}
        title={interest}
        colour={isSelected ? colours.light.secondary : colours.light.text}
        clickable={true}
        disabled={selectedInterests.length == 4}
        onPress={() => toggleInterest(interest)}
      />
    );
  });

  const completeOnboarding = async () => {
    if (selectedInterests.length > 0) {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      // Store the selected interests for future use
      await AsyncStorage.setItem(
        "selectedInterests",
        JSON.stringify(selectedInterests)
      );
      router.push("/(tabs)/events");
    } else {
      Alert.alert("Please select at least one interest to proceed.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundGradient.png")}
      style={styles.container}
    >
      <View
        style={[
          styles.headerContainer,
          { marginTop: Platform.select({ ios: 60 }) },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={colours.light.text}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Select your interests ✨</Text>
        <StepBar activeStep={2}></StepBar>
        <Text style={styles.body}>
          Select up to 4 interests ({selectedInterests.length}/4)
        </Text>
        <View style={styles.interestContainer}>{generateInterests}</View>
        <View style={styles.buttonContainer}>
          <StyledButton
            onPress={completeOnboarding}
            title="Sign Up"
            colour={
              selectedInterests.length > 0
                ? colours.light.secondary
                : "#CCCCCC" // Disabled colour
            }
            shadowColour={colours.light.primary}
            colourChange={false}
            disabled={selectedInterests.length === 0} // Disable button if no interests selected
          />
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    color: colours.light.text,
    fontFamily: "Bold",
  },
  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerContainer: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  body: {
    fontSize: 14,
    color: colours.light.text,
    fontFamily: "Regular",
    margin: 6,
  },
});
