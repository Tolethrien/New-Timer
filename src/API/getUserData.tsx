import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import db from "./firebase";
export interface ProjectsData {
  id: string;
  tasks: TasksData[];
  data: any;
}

export interface TasksData {
  id: string;
  data: any;
}
export const GetUserData = () => {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [tasks, setTasks] = useState<TasksData[]>([]);

  const GetTasks = () => {
    const querySorted = query(
      collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
    );
    onSnapshot(querySorted, (snap) => {
      setTasks(snap.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
    });
  };

  const GetProjects = () => {
    const querySorted = query(
      collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(querySorted, (snap) => {
      setProjects(
        snap.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
          tasks: [],
        }))
      );
    });
  };

  useEffect(() => {
    GetProjects();
    GetTasks();
  }, []);
  const makeData = () => {
    let data = projects;
    data.forEach(
      (e) => (e.tasks = tasks.filter((t) => t.data.projectID === e.id))
    );
    return data;
  };
  return makeData();
};
