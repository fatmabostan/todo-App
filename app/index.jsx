import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors";
import CustomButton from "../src/components/CustomButton";
import content from "../src/content.json";
import { useUserContext } from "../src/firebase/UserProvider";
import { onAuthStateChange } from "../src/firebase/auth";

const index = () => {
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user) {
        router.replace("/undone");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>;
  }

  return (
    <View style={styles.page}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/images/mainphoto.png")}
          style={styles.img}
        />
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{content.homePage.title}</Text>
          <Text style={styles.discription}>{content.homePage.message}</Text>
        </View>
        <View style={styles.buttonDiv}>
          <CustomButton
            text={content.homePage.buttonText}
            width="100%"
            handlePress={() => router.push("/login")}
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.mainColor,
  },
  img: {
    flex: 2,
    width: "100%",
  },
  container: {
    flex: 0.5,
    justifyContent: "space-evenly",
    marginHorizontal: 25,
  },
  discription: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 20,
    color: colors.textColor,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 22,
    color: colors.titleColor,
    textDecorationLine: "underline",
  },
});
