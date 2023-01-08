import {
  doc,
  collection,
  setDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  query,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import db from "./firebase";

export const colors = {
  Orange: 41,
  Green: 116,
  Blue: 180,
  Purple: 256,
  Pink: 330,
};
export const ProjectStatuses = ["Active", "On Hold", "Done"];
//===========PROJECTS===========================
export const addProject = (name: string) => {
  const projectRef = doc(
    collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects")
  );
  setDoc(projectRef, {
    name: name,
    createdAt: serverTimestamp(),
    color:
      Object.values(colors)[
        Math.floor(Math.random() * Object.values(colors).length)
      ],
    status: "Active",
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

export const updateProject = (id: string, value: {}) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Projects",
    id
  );
  updateDoc(projectRef, value);
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
    status: "Active",
    timeSpend: 0,
    timeExpected: 25 * 60,
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
export const updateTask = (id: string, value: {}) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    id
  );
  updateDoc(projectRef, value);
};
export const updateCheckbox = (
  taskId: string,
  checkboxId: string,
  key: string,
  value: any
) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    taskId
  );

  updateDoc(projectRef, { [`checkboxes.${checkboxId}.${key}`]: value });
};
export const deleteCheckbox = (id: string, checkboxId: string) => {
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    id
  );
  updateDoc(projectRef, {
    [`checkboxes.${checkboxId}`]: deleteField(),
  });
};
export const addNewCheckbox = (taskId: string, name: string) => {
  const newId = Math.random().toString().slice(2, -2);
  const projectRef = doc(
    db,
    "Users",
    "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
    "Tasks",
    taskId
  );
  updateDoc(projectRef, {
    [`checkboxes.${newId}`]: {
      name: name,
      createdAt: serverTimestamp(),
      value: false,
    },
  });
};
const KILLALLTASKS = () => {
  // DO NOT EVOKE!!!
  let x: any[] = [];
  const querySorted = query(
    collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
  );
  onSnapshot(querySorted, (snap) => {
    x = snap.docs.map((doc) => ({ id: doc.id }));
    x.forEach((e) =>
      deleteDoc(doc(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks", e.id))
    );
    alert("All tasks Deleted");
  });
};
