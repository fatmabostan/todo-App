import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export async function createUser(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = await signIn(email, password);
    return user;
  } catch (error) {
    console.log(`${error} buraya bak`);
    const errorCode = error.code;
    let errorMessage = "";
    switch (errorCode) {
      case "auth/email-already-in-use":
        errorMessage = "This email address is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/weak-password":
        errorMessage = "The password must be at least 6 characters long.";
        break;
      default:
        errorMessage = "An unknown error occurred.";
        break;
    }
    return Promise.reject(errorMessage);
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error.code);
    const errorCode = error.code;
    let errorMessage = "";

    switch (errorCode) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/user-disabled":
        errorMessage = "This user account has been disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "The password entered is incorrect.";
        break;
      case "auth/too-many-requests":
        errorMessage =
          "Too many unsuccessful login attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your internet connection.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "Sign-in operation is currently disabled. Please contact support.";
        break;
      default:
        errorMessage = "An unknown error occurred.";
        break;
    }
    return Promise.reject(errorMessage);
  }
}

export function onAuthStateChange(callback) {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
}

export async function signOutSession() {
  try {
    await signOut(auth);
  } catch (error) {
    let errorMessage = "An error occurred while signing out";
    throw new Error(errorMessage);
  }
}
