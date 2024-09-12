import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No tasks found.</Text>
      <Text style={styles.text}>No task created yet</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#F9F9F9', // Light background color for contrast
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark color for better readability
    marginBottom: 8, // Space between title and text
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: '#666', // Slightly lighter color for the secondary text
  },
});
