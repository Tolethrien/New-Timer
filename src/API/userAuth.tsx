import { useState, useEffect } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import db from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

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

export const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
};
// signOut(auth);
// signInWithEmailAndPassword(auth, "tolethrien@gmail.com", "Radenes11");
// export const sendEmail = () => {
//   return sendEmailVerification(auth.currentUser);
// };
// export const updateAcc = (name: string) => {
//   return updateProfile(auth.currentUser, { displayName: name });
// };
