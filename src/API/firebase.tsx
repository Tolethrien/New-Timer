import { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  query,
  onSnapshot,
  getDocs,
  orderBy,
  collectionGroup,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile,
  User,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDeue2eUwS2eJkEGbM3beWDZp-vgtwmJFA",
  authDomain: "master-timer.firebaseapp.com",
  projectId: "master-timer",
  storageBucket: "master-timer.appspot.com",
  messagingSenderId: "54548940083",
  appId: "1:54548940083:web:9b4a5bfcb464b5b79a6a46",
};
export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
// setPersistence(auth, browserLocalPersistence);
// signOut(auth);
// signInWithEmailAndPassword(auth, "tolethrien@gmail.com", "Radenes11");
// export const sendEmail = () => {
//   return sendEmailVerification(auth.currentUser);
// };
// export const updateAcc = (name: string) => {
//   return updateProfile(auth.currentUser, { displayName: name });
// };
//sdsds
export const RegisterNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser!, { displayName: name });
  const projectRef = doc(
    collection(db, "Users", auth.currentUser!.uid, "Meta")
  );
  await setDoc(projectRef, {});
};
export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const logout = async () => {
  await signOut(auth);
};
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
};

// export const createUserMeta = () => {
//   const projectRef = doc(
//     collection(db, "Users", auth.currentUser.uid, "Projects")
//   );
//   const metaRef = doc(collection(db, "Users", auth.currentUser.uid, "Meta"));
//   setDoc(projectRef, {});
//   setDoc(metaRef, {});
// };

export default getFirestore();
