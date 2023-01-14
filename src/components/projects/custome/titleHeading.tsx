import styled from "styled-components";
import EditableTitle from "../../custom/editableTitle";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { BackArrow, Detail } from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import { deleteTask, deleteProject } from "../../../API/handleDocs";
import ButtonAsIcon from "../../styled/buttonAsIcon";
import { ProjectsData, TasksData } from "../../../API/getUserData";
interface TitleHeadingProps {
  type: string;
  document: ProjectsData | TasksData;
}
const TitleHeading: React.FC<TitleHeadingProps> = ({ type, document }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    if (type === "project") navigate("..");
    else if (type === "task")
      navigate(`../project/${(document as TasksData).data.projectID}`);
  };

  const deleteData = () => {
    if (type === "project") {
      deleteProject(document as ProjectsData);
      navigate("..");
    } else if (type === "task") {
      deleteTask(document as TasksData);
      navigate(`../project/${(document as TasksData).data.projectID}`);
    }
  };
  return (
    <ComponentBody>
      <ButtonAsIcon
        src={BackArrow}
        size={[1.5, 2.5]}
        position={"50% 70%"}
        onClick={() => navigateTo()}
      ></ButtonAsIcon>
      <EditableTitle text={document.data.name}></EditableTitle>
      <OptionsButton>
        <DropMenuButton src={Detail} alt="more options">
          <DropMenuOption callback={() => deleteData()}>Remove</DropMenuOption>
        </DropMenuButton>
      </OptionsButton>
    </ComponentBody>
  );
};
export default TitleHeading;
const ComponentBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const OptionsButton = styled.div`
  display: flex;
  align-items: center;
`;
