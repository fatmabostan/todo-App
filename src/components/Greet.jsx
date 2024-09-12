import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../assets/colors";

const Greet = (props) => {
  return (
    <View style={styles.greetContainer}>
      <Text style={styles.title}>Welcome, </Text>
      <Text style={styles.nameText}>{props.userName}!</Text>
    </View>
  );
};

export default Greet;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: colors.titleColor,
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: colors.titleColor,
  },
});
