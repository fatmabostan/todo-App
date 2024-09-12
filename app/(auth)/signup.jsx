import colors from "../../assets/colors";
import content from "../../src/content.json";
import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import FormField from "../../src/components/FormField";
import CustomButton from "../../src/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../src/firebase/auth";
import { addUserData } from "../../src/firebase/database";
import { useUserContext } from "../../src/firebase/UserProvider";

const SignUp = () => {
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const { setUser } = useUserContext();
  const [isSubmitting, setSubmit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitForm = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Please fill in all fields");
    } else {
      setSubmit(true);
      try {
        const user = await createUser(form.email, form.password);
        await addUserData(form);
        setUser(user);
        console.log(user);
        Alert.alert("Succesfully registered!");
        router.replace("/undone");
      } catch (errorMessage) {
        Alert.alert(errorMessage);
      } finally {
        setSubmit(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Image
          style={{ height: 90, width: 90 }}
          source={require("../../assets/images/icon.png")}
        />
        <Text style={styles.title}>{content.signup.title}</Text>

        <View style={styles.formContainer}>
      
          <FormField
            placeholder="Name"
            value={form.name}
            handleChangeText={(value) => setForm({ ...form, name: value })}
            keyboardType="text"
            returnKeyType="next"
            onSubmitEditing={() => input2Ref.current.focus()}
            blurOnSubmit={false}
            height={55}
          />

    
          <FormField
            placeholder="Email"
            ref={input2Ref}
            value={form.email}
            handleChangeText={(value) => setForm({ ...form, email: value })}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => input3Ref.current.focus()}
            blurOnSubmit={false}
            height={55}
          />

       
          <FormField
            placeholder="Password"
            ref={input3Ref}
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            keyboardType="numeric"
            secureTextEntry={true}
            returnKeyType="done"
            onSubmitEditing={submitForm}
            height={55}
          />
         
          <CustomButton
            text={content.signup.buttonText}
            width="100%"
            handlePress={submitForm}
          />
        </View>

        <View style={styles.loginContainer}>
          <Link href="/login" style={styles.loginText}>
            {content.signup.loginText}
          </Link>
        </View>
      </View>
   
      {isSubmitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondaryColor,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    marginVertical: 17,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: colors.titleColor,
  },
  formContainer: {
    gap: 15,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  loginText: {
    marginTop: 20,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: colors.textColor,
    textDecorationLine: "underline",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
