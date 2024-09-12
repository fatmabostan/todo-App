import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export async function addUserData(form) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserNameByEmail(email) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userName = userDoc.data().name;
      console.log("User name:", userName);
      return userName;
    } else {
      console.log("No user found with the email:", email);
      return null;
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
}

export async function getUndone(email) {
  console.log(email);
  const collectionName = email;
  const q = query(collection(db, collectionName), where("Done", "==", false));
  console.log(q);
  try {
    // Koleksiyon içindeki tüm belgeleri al
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(), 
      }));
      return todos;
    } else {
      console.log("No documents found in this collection.");
    }
  } catch (error) {
    console.error("Error listing documents:", error);
  }
}

export async function getDone(email) {
  console.log(email);
  const collectionName = email;
  const q = query(collection(db, collectionName), where("Done", "==", true));
  console.log(q);
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(), 
      }));
      return todos;
    } else {
      console.log("No documents found in this collection.");
    }
  } catch (error) {
    console.error("Error listing documents:", error);
  }
}

export async function updateTaskStatus(email, taskId, doneStatus) {
  const taskRef = doc(db, email, taskId);
  try {
    console.log(taskRef);
    await updateDoc(taskRef, {
      Done: doneStatus,
    });
    console.log("başarılı");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function addTask(email, taskDescription) {
  console.log(email, taskDescription);

  try {
    const docRef = await addDoc(collection(db, email), {
      Description: taskDescription,
      Done: false,
    });
    const newData = await getUndone(email);
    return newData;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
