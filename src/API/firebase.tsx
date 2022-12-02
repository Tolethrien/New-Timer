import { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  query,
  onSnapshot,
  getDocs,
  orderBy,
  collectionGroup,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

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
// export const signup = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };
// export const sendEmail = () => {
//   return sendEmailVerification(auth.currentUser);
// };
// export const updateAcc = (name: string) => {
//   return updateProfile(auth.currentUser, { displayName: name });
// };
//sdsds
export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
// export const logout = () => {
//   return signOut(auth);
// };
// export const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState();
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
//     return unsub;
//   }, []);
//   return currentUser;
// };

// export const GetData = async () => {
//   const [data, setData] = useState([]);
//   // let build = [];
//   useEffect(() => {
//     const querySorted = query(
//       collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects"),
//       orderBy("createdAt", "desc")
//     );
//     onSnapshot(querySorted, async (snap) => {
//       let build = [];
//       snap.docs.forEach(async (doc, index) => {
//         build[index] = { data: doc.data(), id: doc.id, tasks: [] };
//         const tasks = collection(
//           db,
//           "Users",
//           auth.currentUser.uid,
//           "Projects",
//           doc.id,
//           "Tasks"
//         );
//         onSnapshot(tasks, (snap2) => {
//           snap2.docs.forEach(async (doc2) => {
//             await build[index].tasks.push({ data: doc2.data(), id: doc2.id });
//           });
//         });
//       });
//       setData(build);
//     });
//   }, []);
//   if (data.length > 0) {
//     console.log("fire", data);
//     return data;
//   }
//   // return data;
// };

// export async function tester() {
//   let build = [];
//   const querySorted = query(
//     collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects"),
//     orderBy("createdAt", "desc")
//   );
//   const doki = await getDocs(querySorted);
//   // console.log(doki.docs);
//   for (let i = 0; i < doki.docs.length; i++) {
//     build[i] = { data: doki.docs[i].data(), id: doki.docs[i].id, tasks: [] };
//     // console.log(build[i]);
//     const queryTaskSorted = query(
//       collection(
//         db,
//         "Users",
//         "T5vA38SaQRMIqNj0Sa4mGn3QS3e2",
//         "Projects",
//         build[i].id,
//         "Tasks"
//       ),
//       orderBy("createdAt", "desc")
//     );
//     const taski = await getDocs(queryTaskSorted);
//     for (let j = 0; j < taski.docs.length; j++) {
//       // console.log("tutaj sa taski");
//       build[i].tasks.push({ data: taski.docs[j].data(), id: taski.docs[j].id });
//     }
//   }
//   // console.log("poczekalem", build);
//   return build;
// }

// export const GetProjects = () => {
//   const [projectsList, setProjectsList] = useState([]);
//   useEffect(() => {
//     const querySorted = query(
//       collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Projects"),
//       orderBy("createdAt", "desc")
//     );
//     onSnapshot(querySorted, (snap) => {
//       setProjectsList(
//         snap.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
//       );
//     });
//   }, []);
//   return projectsList;
// };
// export const GetTasks = () => {
//   const [TasksList, setTasksList] = useState([]);
//   useEffect(() => {
//     const querySorted = query(
//       collection(db, "Users", "T5vA38SaQRMIqNj0Sa4mGn3QS3e2", "Tasks")
//     );
//     onSnapshot(querySorted, (snap) => {
//       setTasksList(snap.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
//     });
//   }, []);
//   return TasksList;
// };

// export const createUserMeta = () => {
//   const projectRef = doc(
//     collection(db, "Users", auth.currentUser.uid, "Projects")
//   );
//   const metaRef = doc(collection(db, "Users", auth.currentUser.uid, "Meta"));
//   setDoc(projectRef, {});
//   setDoc(metaRef, {});
// };

// export const colors = [
//   "#ffff00",
//   "#ff0000",
//   "#0000ff",
//   "#008000",
//   "#800080",
//   "#ffffff",
//   "#000000",
// ];
// export const addProject = (name) => {
//   const projectRef = doc(
//     collection(db, "Users", auth.currentUser.uid, "Projects")
//   );
//   setDoc(projectRef, {
//     name: name,
//     createdAt: serverTimestamp(),
//     color: colors[Math.floor(Math.random() * colors.length)],
//   });
// };
// export const deleteProject = (id) => {
//   const projectRef = doc(db, "Users", auth.currentUser.uid, "Projects", id);
//   // console.log(projectRef);
//   deleteDoc(projectRef);
// };
// export const changeProjectName = (id, newName) => {
//   const projectRef = doc(db, "Users", auth.currentUser.uid, "Projects", id);
//   // console.log(projectRef);
//   updateDoc(projectRef, { name: newName });
// };
// export const addTask = (id, name) => {
//   const projectRef = doc(
//     collection(db, "Users", auth.currentUser.uid, "Tasks")
//   );
//   setDoc(projectRef, {
//     name: name,
//     createdAt: serverTimestamp(),
//     finished: false,
//     totalTime: 25,
//     timeLeft: 25,
//     projectID: id,
//   });
// };
// export const changeTaskOptions = ({ id, value, newValue }) => {
//   console.log(id);
//   const projectRef = doc(db, "Users", auth.currentUser.uid, "Tasks", id);
//   updateDoc(projectRef, { [value]: newValue });
// };
// export const deleteTask = (taskID) => {
//   console.log(taskID);
//   const projectRef = doc(db, "Users", auth.currentUser.uid, "Tasks", taskID);
//   deleteDoc(projectRef);
// };

export default getFirestore();
