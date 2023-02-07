import styled from "styled-components";
import EditableTitle from "../../custom/editableTitle";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { BackArrow, Detail } from "../../utils/icons";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, deleteProject } from "../../../API/handleDocs";
import ButtonAsIcon from "../../custom/buttonAsIcon";
import { ProjectsData, TasksData } from "../../../API/getUserData";
import useDataFinder from "../../hooks/useDataFinder";

const TitleHeading: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const document = useDataFinder<ProjectsData | TasksData>(id)!;

  const navigateTo = () => {
    if ("tasks" in document) navigate("..");
    else navigate(`../project/${document.data.projectID}`);
  };

  const deleteData = () => {
    if ("tasks" in document) {
      deleteProject(document);
      navigate("..");
    } else {
      deleteTask(document);
      navigate(`../project/${document.data.projectID}`);
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
          <DropMenuOption callback={deleteData}>Remove</DropMenuOption>
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
