import { useState, useEffect } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import db from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  updateProfile,
  User,
  updateEmail,
  updatePassword,
} from "firebase/auth";

export interface updateAccType {
  param: "name" | "email" | "password";
  value: string;
}

const auth = getAuth();

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

export const login = async (
  email: string,
  password: string,
  callback?: () => void
) => {
  await signInWithEmailAndPassword(auth, email, password).catch(() =>
    callback?.()
  );
};

export const logout = async () => {
  await signOut(auth);
};

export const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
};

export const updateAcc = async ({ param, value }: updateAccType) => {
  if (param === "name")
    await updateProfile(auth.currentUser!, { displayName: value });
  else if (param === "email") updateEmail(auth.currentUser!, value);
  else if (param === "password") updatePassword(auth.currentUser!, value);
};
