import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colours from '../colours';

const InputBox = ({ length, placeholder, type, multiline }) => {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={{ width: length, marginBottom: 20 }}>
      <View style={styles.shadowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              multiline && { height: 100 }, // Adjust height for multiline input
            ]}
            onChangeText={onChangeText}
            value={text}
            placeholder={placeholder}
            inputMode={type}
            multiline={multiline}
            numberOfLines={5}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    textAlignVertical: 'top', // Align text to the top for multiline inputs
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  shadowContainer: {
    borderRadius: 15,
    shadowColor: colours.light.primary,
    shadowOffset: { width: 0, height: 5 },
    textShadowOffset: 0,
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
});

export default InputBox;
