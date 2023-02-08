import { collection, doc } from "firebase/firestore";
import db, { auth } from "./firebase";

export const colors = {
  Orange: 41,
  Green: 116,
  Blue: 180,
  Purple: 256,
  Pink: 330,
};
export const ProjectStatuses = ["Active", "On Hold", "Done"];
export const allProjectsRef = () =>
  doc(collection(db, "Users", auth.currentUser?.uid!, "Projects"));
export const allTasksRef = () =>
  doc(collection(db, "Users", auth.currentUser?.uid!, "Tasks"));
export const projectRef = (id: string) =>
  doc(db, "Users", auth.currentUser?.uid!, "Projects", id);
export const taskRef = (id: string) =>
  doc(db, "Users", auth.currentUser?.uid!, "Tasks", id);
