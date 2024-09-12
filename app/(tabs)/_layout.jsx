import { StyleSheet, Text, View, Image } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import images from "../../assets/images";
import colors from "../../assets/colors";

const TabIcon = ({ icon, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image style={styles.iconImage} source={icon} resizeMode="contain" />
      <Text
        style={[
          styles.iconText,
          { color: focused ? colors.mainColor : "black" },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: colors.highlightColor,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          backgroundColor: colors.buttonColor,
          borderTopWidth: 4,
          borderColor: colors.borderColor,
        },
      }}
    >
      <Tabs.Screen
        name="undone"
        options={{
          title: "Undone",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={images.undone}
              name="undone"
              focused={focused}
              color={colors.buttonText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: "Done",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={images.done}
              name="done"
              focused={focused}
              color={colors.buttonText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={images.user}
              name="user"
              focused={focused}
              color={colors.buttonText}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 10,
  },
  iconImage: {
    alignSelf: "center",
    width: 35,
    height: 35,
  },
  iconText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 13,
  },
});
