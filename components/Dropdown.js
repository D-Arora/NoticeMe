import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CustomDropdown = ({
  items,
  placeholder = "Select an option",
  onSelect,
  dropdownStyle = {},
  placeholderStyle = {},
  itemTextStyle = {},
  selectedItemStyle = {},
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          onSelect(item.value);
        }}
        // Customizable styles for dropdown
        style={[styles.dropdown, dropdownStyle]}
        placeholderStyle={[styles.placeholderText, placeholderStyle]}
        selectedTextStyle={[styles.selectedItemText, selectedItemStyle]}
        itemTextStyle={[styles.itemText, itemTextStyle]}
        containerStyle={styles.dropdownContainer}
        selectedRowStyle={styles.selectedRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    overflow: "hidden",
    width: "100%",
    maxWidth: 150,
  },
  dropdown: {
    height: 50,
    borderColor: "#F7F7F7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#F7F7F7",
  },
  placeholderText: {
    color: "#006D62",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    color: "#00B192",
    fontSize: 16,
    fontWeight: "medium",
  },
  selectedItemText: {
    color: "#006D62",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    borderColor: "#F7F7F7",
    borderRadius: 8,
  },
  selectedRow: {
    backgroundColor: "#f0f0f0",
  },
});

export default CustomDropdown;
