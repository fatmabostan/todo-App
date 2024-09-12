import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../../assets/colors";
import React, { forwardRef } from "react";

const FormField = forwardRef((props, ref) => {
  return (
    <View>
      <TextInput
        ref={ref}
        style={[styles.input, { height: props.height }]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={colors.placeholderTextColor}
        onChangeText={props.handleChangeText}
        textAlign="center"
        {...props}
      />
    </View>
  );
});

export default FormField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 4,
    borderColor: colors.borderColor,
    borderRadius: 24,
    backgroundColor: colors.placeholderColor,
    padding: 18,
  },
});
