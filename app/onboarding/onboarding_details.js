import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StyledButton from '../../components/StyledButton';
import InputBox from '../../components/InputBox';
import StepBar from '../../components/StepBar';
import colours from '../../colours';
import { useRouter, useNavigation } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function OnboardingDetails() {
  const router = useRouter();
  const navigation = useNavigation();
  const goToNextScreen = () => {
    router.push("/onboarding/onboarding_interests");
  };

  return (
    <ImageBackground source={require("../../assets/images/BackgroundGradient.png")} style={styles.container}>
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
        <Text style={styles.body}>Looks like you don't have an account with us yet...</Text>
        <Text style={styles.header}>Set up your profile ✍️ </Text>
        <StepBar activeStep={1}></StepBar>
        <Text style={styles.subheading}>Name</Text>
        <InputBox length="100%" multiline={false} placeholder="Samantha Wright" />
        <Text style={styles.subheading}>Degree</Text>
        <Text style={styles.subheading}>Short Description of Yourself</Text>
        <InputBox
          length="100%"
          multiline={true}
          placeholder="I'm a passionate software engineer, with a strong background in computer science."
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
    justifyContent: 'space-between',
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
    fontFamily: "Regular"
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
