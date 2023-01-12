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
    checkboxes: checkboxes;
    projectID: string;
    name: string;
    status: string;
    timeSpend: number;
    timeExpected: number;
    showCheckboxes: boolean;
    showDescription: boolean;
  };
}
export interface checkboxes {
  [key: string]: { createdAt: number; name: string; value: boolean };
}
export interface MetaData {}
export const GetUserData = () => {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [tasks, setTasks] = useState<TasksData[]>([]);
  // const [metaData, setMetaData] = useState<{} | undefined>({});
  const GetTasks = async () => {
    const querySorted = query(
      collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
    );
    await onSnapshot(
      querySorted,
      (snap) => {
        setTasks(
          snap.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          })) as TasksData[]
        );
      },
      (err) => console.log("cos sie nie udalo", err)
    );
  };

  const GetProjects = async () => {
    const querySorted = query(
      collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects"),
      orderBy("createdAt", "desc")
    );
    await onSnapshot(
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
      (err) => console.log("cos sie nie udalo", err)
    );
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
