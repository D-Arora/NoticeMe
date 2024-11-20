import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import CustomDropdown from "../../../components/Dropdown.js";
import MultiSelectDropdown from "../../../components/Multiselect.js";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import colours from "../../../colours.js";
import StyledButton from "../../../components/StyledButton.js";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfile() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [text, onChangeText] = React.useState("Text");
  const [value, onChangeMultiText] = React.useState("Multiline Placeholder");

  const itemsYear = [
    { label: "1st Year", value: "1st" },
    { label: "2nd Year", value: "2nd" },
    { label: "3rd Year", value: "3rd" },
    { label: "4th Year", value: "4th" },
    { label: "5th Year", value: "5th" },
    { label: "6th Year", value: "6th" },
  ];

  const itemsFaculty = [
    { label: "Engineering", value: "Eng" },
    { label: "Medicine & Health", value: "Med" },
    { label: "Arts, Design & Architecture", value: "ADA" },
    { label: "Law & Justice", value: "Law" },
    { label: "Science", value: "Sci" },
    { label: "Business", value: "Bus" },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("profile/index", params)}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
  });

  const handleSelect = (value) => {
    console.log("Selected item:", value);
  };

  const goBackToProfile = () => {
    navigation.navigate("profile/index", params);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <Text style={styles.heading1}>Edit Profile</Text>
        <View style={styles.boxContainer}>
          <Text style={styles.heading2}>Name</Text>
          <View style={styles.shadowContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <Text style={styles.heading2}>Bio</Text>
          <View style={styles.shadowContainer}>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={(text) => onChangeMultiText(text)}
              value={value}
              style={styles.textInput}
            />
          </View>
          <Text style={styles.heading2}>Tags</Text>
          <View style={styles.dropDownContainer}>
            <View style={styles.container}>
              <CustomDropdown
                items={itemsYear}
                placeholder="Year of Degree"
                onSelect={handleSelect}
              />
            </View>
            <View style={styles.container}>
              <MultiSelectDropdown
                items={itemsFaculty}
                placeholder="Faculty"
                onSelect={handleSelect}
                dropdownStyle={{ marginVertical: 10 }}
                placeholderStyle={{ color: "#006D62", fontWeight: "bold" }}
                selectedTextStyle={{ color: "#00B192" }}
              />
            </View>
          </View>
        </View>
        <View>
          <StyledButton
            onPress={goBackToProfile}
            title="Save Changes"
            colourChange={false}
            textColour="white"
            textSize={25}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  dropDownContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  boxContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: colours.light.primary,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  heading1: {
    fontSize: 32,
    fontWeight: "600",
    color: colours.light.text,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 25,
    fontWeight: "600",
    color: colours.light.text,
    marginTop: 10,
    marginBottom: 10,
  },
  shadowContainer: {
    shadowColor: colours.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  input: {
    height: 58,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
  },
  textInput: {
    height: 186,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});