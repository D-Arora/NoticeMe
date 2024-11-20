import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
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
  const generateInterests = interestList.map((interest, index) => {
    return (
      <Tag
        key={index}
        title={interest}
        colour={colours.light.text}
        clickable={true}
      ></Tag>
    );
  });

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
    router.push("/(tabs)/events");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundGradient.png")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
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
        <Text style={styles.body}>Select up to 4 interests</Text>
        <View style={styles.interestContainer}>{generateInterests}</View>
        <View style={styles.buttonContainer}>
          <StyledButton
            onPress={completeOnboarding}
            title="Sign Up"
            colour={colours.light.secondary}
            shadowColour={colours.light.primary}
            colourChange={false}
          ></StyledButton>
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
