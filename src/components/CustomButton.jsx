import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../assets/colors";

const CustomButton = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={[styles.button, { width: props.width }]}
        onPress={props.handlePress}
      >
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonColor,
    paddingVertical: 8,
    borderRadius: 24,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 18,
    color: colors.buttonText,
  },
});
