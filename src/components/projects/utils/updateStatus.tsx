import { ProjectsData, TasksData } from "../../../API/getUserData";
import {
  ProjectStatuses,
  updateProject,
  updateTask,
} from "../../../API/handleDocs";
interface updateStatusProps {
  document: ProjectsData | TasksData;
  type: "project" | "task";
  id: string;
}
const updateStatus = ({ document, type, id }: updateStatusProps) => {
  let statusIndex = ProjectStatuses.indexOf(document.data.status);
  let newStatus =
    statusIndex === ProjectStatuses.length - 1 ? 0 : (statusIndex += 1);
  if (type === "project")
    updateProject(id!, { status: ProjectStatuses[newStatus] });
  else if (type === "task")
    updateTask(id!, { status: ProjectStatuses[newStatus] });
};
export default updateStatus;
