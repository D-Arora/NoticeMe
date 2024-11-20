import React, {useState} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import StyledButton from "../../components/StyledButton";
import InputBox from "../../components/InputBox";
import StepBar from "../../components/StepBar";
import DropDown from "../../components/Dropdown";
import colours from "../../colours";
import { useRouter, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingDetails() {
  const router = useRouter();
  const navigation = useNavigation();

  // State to track input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [degree, setDegree] = useState(null);

  // save to storage
  const storeProfile = async () => {
    const profileData = { name, degree, description };
    try {
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      console.log("Profile saved successfully!");
    } catch (e) {
      console.error("Error saving user data", e);
    }
  };
  
  const goToNextScreen = () => {
    // Validate all input fields
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }
    if (!degree) {
      Alert.alert("Validation Error", "Please select your degree.");
      return;
    }
    if (!description.trim()) {
      Alert.alert(
        "Validation Error",
        "Please provide a short description of yourself."
      );
      return;
    }

    storeProfile();

    // Proceed if all fields are valid
    router.push("/onboarding/onboarding_interests");
  };

  // Degree options
  const itemsFaculty = [
    { label: "Engineering", value: "Eng" },
    { label: "Medicine & Health", value: "Med" },
    { label: "Arts, Design & Architecture", value: "ADA" },
    { label: "Law & Justice", value: "Law" },
    { label: "Science", value: "Sci" },
    { label: "Business", value: "Bus" },
  ];

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
        <Text style={styles.body}>
          Looks like you don't have an account with us yet...
        </Text>
        <Text style={styles.header}>Set up your profile ✍️ </Text>
        <StepBar activeStep={1}></StepBar>
        <Text style={styles.subheading}>Name</Text>
        <InputBox
          length="100%"
          multiline={false}
          placeholder="Samantha Wright"
          value={name}
          onChange={setName}
        />
        <Text style={styles.subheading}>Degree</Text>
        <DropDown
          items={itemsFaculty}
          placeholder="Faculty"
          onSelect={(value) => setDegree(value)}
          dropdownStyle={{ marginVertical: 10 }}
          placeholderStyle={{ color: "#006D62", fontWeight: "bold" }}
          selectedTextStyle={{ color: "#00B192" }}
        />
        <Text style={styles.subheading}>Short Description of Yourself</Text>
        <InputBox
          length="100%"
          multiline={true}
          placeholder="I'm a passionate software engineer, with a strong background in computer science."
          value={description}
          onChange={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          onPress={goToNextScreen}
          title="Continue"
          colour={colours.light.secondary}
          shadowColour={colours.light.primary}
          colourChange={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    color: colours.light.text,
    fontFamily: "Bold",
  },
  subheading: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    color: colours.light.text,
    fontFamily: "Bold",
  },
  body: {
    fontSize: 14,
    color: colours.light.text,
    fontFamily: "Regular",
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
