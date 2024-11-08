import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Aleo from "../assets/fonts/Aleo-Regular.otf";
import AleoItalic from "../assets/fonts/Aleo-Italic.otf";
import AleoLight from "../assets/fonts/Aleo-Light.otf";
import AleoLightItalic from "../assets/fonts/Aleo-LightItalic.otf";
import AleoBold from "../assets/fonts/Aleo-Bold.otf";
import AleoBoldItalic from "../assets/fonts/Aleo-BoldItalic.otf";
import { SafeAreaView } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(options) {
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
    <SafeAreaView style={{ flex: 1, marginTop: -40, marginBottom: -30 }}>
      <Slot />
    </SafeAreaView>
  );
}
