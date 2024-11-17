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
      <Text> Looks like you don't have an account with us yet...</Text>
      <Text style={styles.header}>Set up your profile</Text>
      <StepBar activeStep={1}></StepBar>
      <Text style={styles.header}>Name</Text>
      <InputBox length="100%" multiline={false} placeholder="Samantha Wright"/>
      <Text style={styles.header}>Degree</Text>
      <Text style={styles.header}>Short Description of Yourself</Text>
      <InputBox length="100%" multiline={true} placeholder="I'm a passionate software engineer, with a strong background in computer science."/>
      <StyledButton onPress={goToNextScreen}
      title="Continue"
      colour={colours.light.secondary}
      shadowColour={colours.light.primary}
      colourChange={false}>
      </StyledButton> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20},
  header: { fontSize: 30, marginTop: 10, marginBottom: 10, color: colours.light.text, fontFamily: "Bold"},
  stepContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20},
  stepNumber: { fontSize: 20, fontWeight: "bold", color: "white" },
  stepText: { fontSize: 16, color: "white" },
  stepBox: { 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    backgroundColor: colours.light.secondary
  },
  headerContainer: {
    justifyContent: 'flex-start',
    marginBottom: 20,
  }
});