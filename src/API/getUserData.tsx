import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  FieldValue,
} from "firebase/firestore";
import db, { auth } from "./firebase";

export type TimeStamp = { nanoseconds: number; seconds: number };
export type CreatedAtType = TimeStamp | FieldValue;
export interface ProjectsData {
  id: string;
  tasks: TasksData[];
  data: {
    color: number;
    status: string;
    name: string;
    createdAt: CreatedAtType;
  };
}

export interface TasksData {
  id: string;
  data: {
    desc: string;
    checkboxes: checkboxesList;
    projectID: string;
    name: string;
    status: string;
    timeSpend: number;
    timeExpected: number;
    showCheckboxes: boolean;
    showFinishedCheckboxes: boolean;
    showDescription: boolean;
  };
}
export interface checkboxesList {
  [key: string]: checkboxesType;
}
export interface checkboxesType {
  createdAt: CreatedAtType;
  name: string;
  value: boolean;
}

export const GetUserData = () => {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [tasks, setTasks] = useState<TasksData[]>([]);

  const GetTasks = () => {
    const querySorted = query(
      collection(db, "Users", auth.currentUser?.uid!, "Tasks")
    );
    onSnapshot(
      querySorted,
      (snap) => {
        setTasks(
          snap.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          })) as TasksData[]
        );
      },
      (err) => console.log(err)
    );
  };

  const GetProjects = () => {
    const querySorted = query(
      collection(db, "Users", auth.currentUser?.uid!, "Projects"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(
      querySorted,
      (snap) => {
        setProjects(
          snap.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
            tasks: [] as TasksData[],
          })) as ProjectsData[]
        );
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    GetProjects();
    GetTasks();
  }, []);

  const makeData = () => {
    let data = projects;
    data.forEach(
      (el) => (el.tasks = tasks.filter((task) => task.data.projectID === el.id))
    );
    return data;
  };
  return makeData();
};
