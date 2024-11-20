import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colours from "../colours";

const StepBar = ({ activeStep }) => {
  return (
    <View style={styles.stepContainer}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepGroup}>
          <View
            style={[
              styles.stepBox,
              activeStep === step && styles.activeStepBox,
            ]}
          >
            <Text style={styles.stepNumber}>{step}</Text>
            <Text style={styles.stepText} numberOfLines={2}>
              {step === 1
                ? "Create Account"
                : step === 2
                ? "Select Interests"
                : "Signup Done"}
            </Text>
          </View>
          {step !== 3 && <View style={styles.line}></View>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stepGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colours.light.secondary,
    borderRadius: 30,
    width: 100,
  },
  activeStepBox: {
    backgroundColor: colours.light.primary,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Regular",
    color: "white",
    textAlign: "center",
  },
  stepText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Regular",
    textAlign: "center",
  },
  line: {
    width: 30,
    height: 5,
    backgroundColor: colours.light.primary,
  },
});

export default StepBar;
