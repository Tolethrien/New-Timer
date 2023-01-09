import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
} from "firebase/firestore";
import db from "./firebase";

// export interface UserData {
//   Meta: {};
//   ProjectsData: ProjectsData[];
// }
export interface ProjectsData {
  id: string;
  tasks: TasksData[];
  data: {
    color: number;
    status: string;
    name: string;
    createdAt: { nanoseconds: number; seconds: number };
  };
}

export interface TasksData {
  id: string;
  data: {
    desc: string;
    check: { [key: string]: {} };
    checkboxes: {
      [key: string]: { createdAt: number; name: string; value: boolean };
    };
    projectID: string;
    name: string;
    status: string;
    timeLeft: number;
    totalTime: number;
  };
}
export interface MetaData {}
export const GetUserData = () => {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [tasks, setTasks] = useState<TasksData[]>([]);
  // const [metaData, setMetaData] = useState<{} | undefined>({});
  const GetTasks = () => {
    const querySorted = query(
      collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
    );
    onSnapshot(querySorted, (snap) => {
      setTasks(
        snap.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        })) as TasksData[]
      );
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
          tasks: [] as TasksData[],
        })) as ProjectsData[]
      );
    });
  };
  // const GetMeta = () => {
  //   const querySorted = doc(
  //     db,
  //     "Users",
  //     "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
  //     "Meta",
  //     "Settings"
  //   );
  //   onSnapshot(querySorted, (doc) => {
  //     setMetaData(doc.data());
  //   });
  // };

  useEffect(() => {
    // GetMeta();
    GetProjects();
    GetTasks();
  }, []);
  const makeData = () => {
    let data = projects;
    data.forEach(
      (e) => (e.tasks = tasks.filter((t) => t.data.projectID === e.id))
    );
    // Object.keys(metaData).length &&
    //   (test = {
    //     meta: metaData,
    //     projects: data,
    //   });
    return data;
  };
  return makeData();
};
