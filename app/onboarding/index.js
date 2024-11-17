import React from "react";
import { ImageBackground, View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import StyledButton from "../../components/StyledButton";
import colours from "../../colours";
import Logo from "../../assets/images/Logo.svg";
import Title from "../../assets/images/NoticeMe.svg";

export default function Index() {
  const router = useRouter();
  const mask = '+1 [0000000]';

  const goToNextScreen = () => {
    router.push("/onboarding/onboarding_details");
  };

  return (
    <ImageBackground source={require("../../assets/images/BackgroundGradient.png")} style={styles.container}>
      <Text>Welcome to</Text>
      <Logo width={250} height={200} />
      <Title width={230} height={100} />
      <StyledButton 
        onPress={goToNextScreen}
        title="Login with zID"
        colour="#FFFFFF"
        shadowColour={colours.light.primary}
        colourChange={false}
        textColour={colours.light.text}
        textSize={25}>
      </StyledButton>
      <View>
        <Image source={require("../../assets/images/friends.png")} style={{height: 300, width: 330}}/>
        <Text>making life-long connections</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
