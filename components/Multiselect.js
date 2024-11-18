import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const MultiSelectDropdown = ({
  items,
  placeholder = "Select options",
  onSelect,
  dropdownStyle = {},
  placeholderStyle = {},
  selectedTextStyle = {},
  itemTextStyle = {},
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelect = (values) => {
    setSelectedValues(values);
    onSelect(values); // Pass selected values to parent
  };

  return (
    <View style={[styles.container, dropdownStyle]}>
      <MultiSelect
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValues}
        onChange={handleSelect}
        // Custom styles
        placeholderStyle={[styles.placeholderText, placeholderStyle]}
        selectedTextStyle={[styles.selectedText, selectedTextStyle]}
        itemTextStyle={[styles.itemText, itemTextStyle]}
        itemContainerStyle={[styles.itemContainer, itemContainerStyle]}
        style={styles.multiSelect}
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
  multiSelect: {
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
  selectedText: {
    color: "#006D62",
    fontSize: 16,
    fontWeight: "medium",
  },
  itemText: {
    color: "#00B192",
    fontSize: 16,
    fontWeight: "medium",
  },
  itemContainer: {
    borderColor: "#F7F7F7",
  },
});

export default MultiSelectDropdown;
