import {
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { randomKey } from "../components/utils/randomKey";
import db, { auth } from "./firebase";
import { ProjectsData, TasksData } from "./getUserData";
import {
  allProjectsRef,
  allTasksRef,
  colors,
  projectRef,
  ProjectStatuses,
  taskRef,
} from "./utils";

//===========PROJECTS===========================
export const addProject = (name: string) => {
  const reference = allProjectsRef();
  setDoc(reference, {
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
  const reference = projectRef(id);
  tasks.forEach((e) => {
    let taskRef = doc(db, "Users", auth.currentUser?.uid!, "Tasks", e.id);
    deleteDoc(taskRef);
  });
  deleteDoc(reference);
};

export const updateProject = (id: string, value: {}) => {
  const reference = projectRef(id);
  updateDoc(reference, value);
};
//===========TASKS===========================
export const deleteTask = ({ id }: { id: string }) => {
  const reference = taskRef(id);
  deleteDoc(reference);
};

export const addTask = (id: string, name: string) => {
  const reference = allTasksRef();
  setDoc(reference, {
    name: name,
    createdAt: serverTimestamp(),
    status: "Active",
    timeSpend: 0,
    timeExpected: 25 * 60,
    projectID: id,
    desc: "",
    showCheckboxes: true,
    showDescription: true,
    checkboxes: {},
  });
};

export const updateTime = (id: string, value: number) => {
  const reference = taskRef(id);
  updateDoc(reference, { totalTime: value });
};

export const updateTask = (id: string, value: {}) => {
  const reference = taskRef(id);
  updateDoc(reference, value);
};

export const updateCheckbox = (
  taskId: string,
  checkboxId: string,
  key: string,
  value: any
) => {
  const reference = taskRef(taskId);
  updateDoc(reference, { [`checkboxes.${checkboxId}.${key}`]: value });
};

export const deleteCheckbox = (id: string, checkboxId: string) => {
  const projectRef = doc(db, "Users", auth.currentUser?.uid!, "Tasks", id);
  updateDoc(projectRef, {
    [`checkboxes.${checkboxId}`]: deleteField(),
  });
};

export const addNewCheckbox = (taskId: string, name: string) => {
  const newId = randomKey();
  const reference = taskRef(taskId);
  updateDoc(reference, {
    [`checkboxes.${newId}`]: {
      name: name,
      createdAt: serverTimestamp(),
      value: false,
    },
  });
};

interface updateStatusProps {
  document: ProjectsData | TasksData;
  id: string;
}
export const updateStatus = ({ document, id }: updateStatusProps) => {
  let statusIndex = ProjectStatuses.indexOf(document.data.status);
  let newStatus =
    statusIndex === ProjectStatuses.length - 1 ? 0 : (statusIndex += 1);
  if ("tasks" in document)
    updateProject(id, { status: ProjectStatuses[newStatus] });
  else updateTask(id, { status: ProjectStatuses[newStatus] });
};

// export const KILLALLTASKS = () => {
//   // DO NOT EVOKE!!!
//   let x: any[] = [];
//   const querySorted = query(
//     collection(db, "Users", auth.currentUser?.uid!, "Projects")
//   );
//   onSnapshot(querySorted, (snap) => {
//     x = snap.docs.map((doc) => ({ id: doc.id }));
//     x.forEach((e) =>
//       deleteDoc(doc(db, "Users", auth.currentUser?.uid!, "Projects", e.id))
//     );
//     alert("All tasks Deleted");
//   });
// };
