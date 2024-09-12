import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import colors from "../../assets/colors";
import FormField from "../../src/components/FormField";
import CustomButton from "../../src/components/CustomButton";
import content from "../../src/content.json";
import { useState, useRef } from "react";
import { signIn } from "../../src/firebase/auth";
import { useUserContext } from "../../src/firebase/UserProvider";

const Login = () => {
  const input2Ref = useRef(null);
  const { setUser } = useUserContext();
  const [isSubmit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Please fill in all fields");
    } else {
      setSubmit(true);
      try {
        const userinfo = await signIn(form.email, form.password);
        console.log(userinfo);
        setUser(userinfo);
        Alert.alert("You successfully joined!");
        router.push("/undone");
      } catch (errorMessage) {
        Alert.alert(errorMessage);
      }
      setSubmit(false);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      {isSubmit ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={{ height: 90, width: 90, marginLeft: 30 }}
            source={require("../../assets/images/icon.png")}
          />
          <Text style={styles.title}>{content.login.title}</Text>
          <Text style={styles.text}>{content.login.message}</Text>

          <View style={styles.formContainer}>
            <FormField
              placeholder="write your email"
              inputMode="email"
              value={form.email}
              handleChangeText={(value) =>
                setForm({
                  ...form,
                  email: value,
                })
              }
              enterKeyHint="next"
              onSubmitEditing={() => input2Ref.current.focus()}
              blurOnSubmit={false}
              height={55}
            />

            <FormField
              placeholder="enter your password"
              ref={input2Ref}
              secureTextEntry={true}
              enterKeyHint="done"
              value={form.password}
              handleChangeText={(value) =>
                setForm({
                  ...form,
                  password: value,
                })
              }
              onSubmitEditing={submit}
              height={55}
            />

            <CustomButton
              text={content.login.buttonText}
              width="100%"
              handlePress={submit}
            />
          </View>
          <View style={styles.signupContainer}>
            <Link href="/signup" style={styles.signupText}>
              {content.login.registerText}
            </Link>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

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
    marginTop: 17,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: colors.titleColor,
  },

  text: {
    color: colors.textColor,
    marginBottom: 18,
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },
  formContainer: {
    gap: 15,
  },
  signupContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  signupText: {
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
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
  },
});
