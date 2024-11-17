import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("hasCompletedOnboarding");
      setHasCompletedOnboarding(status === "true");
    };
    checkOnboardingStatus();
  }, []);

  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)/events" />;
  }

  return <Redirect href="/onboarding" />;
}
