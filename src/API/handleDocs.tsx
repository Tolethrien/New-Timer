import {
  doc,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";

const colors = [
  "#ffff00",
  "#ff0000",
  "#0000ff",
  "#008000",
  "#800080",
  "#ffffff",
  "#000000",
];
export const addProject = (name: string) => {
  const projectRef = doc(
    collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects")
  );
  setDoc(projectRef, {
    name: name,
    createdAt: serverTimestamp(),
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};

export const deleteProject = (id: string) => {
  // dodac usuwanie wszystkich taskow przed usunieciem projektu!
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Projects",
    id
  );
  // console.log(projectRef);
  deleteDoc(projectRef);
};

export const updateTime = (id: string, value: number) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    id
  );
  updateDoc(projectRef, { totalTime: value });
};
