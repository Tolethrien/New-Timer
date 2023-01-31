import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

export default getFirestore();
