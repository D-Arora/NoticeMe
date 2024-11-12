import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Aleo from "../assets/fonts/Aleo-Regular.otf";
import AleoItalic from "../assets/fonts/Aleo-Italic.otf";
import AleoLight from "../assets/fonts/Aleo-Light.otf";
import AleoLightItalic from "../assets/fonts/Aleo-LightItalic.otf";
import AleoBold from "../assets/fonts/Aleo-Bold.otf";
import AleoBoldItalic from "../assets/fonts/Aleo-BoldItalic.otf";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Regular: Aleo,
    Italic: AleoItalic,
    Light: AleoLight,
    LightItalic: AleoLightItalic,
    Bold: AleoBold,
    BoldItalic: AleoBoldItalic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          backgroundColor="transparent"
          translucent
        />
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
