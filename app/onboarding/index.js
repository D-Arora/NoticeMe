import React, { useState } from "react";
import {
  TextInput,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import StyledButton from "../../components/StyledButton";
import colours from "../../colours";
import Logo from "../../assets/images/Logo.svg";
import Title from "../../assets/images/NoticeMe.svg";

export default function Index() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleInputChange = (text) => {
    // Limit input to 7 characters (zID length)
    if (text.length <= 7) {
      setInput(text);
    }
  };

  const goToNextScreen = () => {
    router.push("/onboarding/onboarding_details");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundGradient.png")}
      style={styles.container}
    >
      <Text style={styles.body}>Welcome to</Text>
      <Logo width={250} height={200} />
      <Title width={230} height={100} />

      <Text style={styles.body}>To start, please enter your zID</Text>
      <View style={styles.inputContainer}>
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <Text key={index} style={styles.character}>
              {input[index] || "_"}
            </Text>
          ))}
      </View>

        <TextInput
          style={styles.hiddenInput}
          value={input}
          keyboardType="numeric"
          maxLength={7}
          returnKeyType="done"
          onSubmitEditing={goToNextScreen}
          onChangeText={handleInputChange}
          autoFocus
        />

      <View style={styles.buttonContainer}>
        <StyledButton
          onPress={goToNextScreen}
          title="Login with zID"
          colour="#FFFFFF"
          shadowColour={colours.light.primary}
          colourChange={false}
          textColour={colours.light.text}
          textSize={25}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  character: {
    fontSize: 40,
    color: colours.light.text,
    marginHorizontal: 5,
    fontFamily: "Courier",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  inputLineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputLines: {
    width: 20,
    height: 3,
    backgroundColor: colours.light.text,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
  body: {
    fontSize: 16,
    color: colours.light.text,
    fontFamily: "Regular",
  },
});
