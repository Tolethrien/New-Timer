import {
  doc,
  collection,
  setDoc,
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
//===========PROJECTS===========================
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

export const deleteProject = ({ id, tasks }: { id: string; tasks: any[] }) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Projects",
    id
  );
  tasks.forEach((e) => {
    let taskRef = doc(
      db,
      "Users",
      "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
      "Tasks",
      e.id
    );
    deleteDoc(taskRef);
  });
  deleteDoc(projectRef);
};
export const updateProject = (id: string, value: number) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    id
  );
  updateDoc(projectRef, { totalTime: value });
};
//===========TASKS===========================
export const deleteTask = ({ id }: { id: string }) => {
  const taskRef = doc(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks", id);

  deleteDoc(taskRef);
};
export const addTask = (id: string, name: string) => {
  const projectRef = doc(
    collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
  );
  setDoc(projectRef, {
    name: name,
    createdAt: serverTimestamp(),
    finished: false,
    totalTime: 25,
    timeLeft: 25,
    projectID: id,
  });
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
