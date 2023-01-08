import styled from "styled-components";
import FindData from "../../hooks/findData";
import { TasksData } from "../../../API/getUserData";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useRef, useId } from "react";
import { clockContext } from "../../providers/clockProvider";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import {
  deleteTask,
  updateTask,
  ProjectStatuses,
} from "../../../API/handleDocs";
import {
  BackArrow,
  Edit,
  Clock,
  Detail,
  CheckBoxEmpty,
  CheckBoxFill,
  Add,
} from "../../utils/icons";
import CheckBox from "../projectsComponents/checkbox";
import Category from "../projectsComponents/category";
import TaskDescriptionBox from "../projectsComponents/taskDescriptionBox";
import TaskOption from "../projectsComponents/taskOption";
import EditableText from "../../custom/editableText";
import { ConvertToStringTime } from "../../hooks/convertToTime";
interface TasksOverviewProps {}
interface StyleProps {}
const TaskOverview: React.FC<TasksOverviewProps> = () => {
  const { id } = useParams();
  const task = FindData(id!) as TasksData;
  const navigate = useNavigate();
  const [showCheckboxes, setshowCheckboxes] = useState(true);
  const [showDesc, setshowDesc] = useState(true);
  const [addCardMenu, setAddCardMenu] = useState(false);
  const { setClock } = useContext(clockContext);
  const {
    newColor: { newColor },
  } = useContext(appContext);
  // const setAndOpenTimer = () => {
  //   setClock(task?.data.totalTime, task!.id);
  //   navigate("/timer");
  //   currentWindow.set(1);
  // };

  const updateStatus = () => {
    let st = ProjectStatuses.indexOf(task?.data.status);
    let newSt = st === ProjectStatuses.length - 1 ? 0 : (st += 1);
    // console.log(newSt);
    updateTask(id!, { status: ProjectStatuses[newSt] });
  };
  if (!task)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <Head hue={newColor}>
        <BackAndNameAndOptions>
          <BackButton>
            <ButtonImg
              src={BackArrow}
              size={[25, 40]}
              margin="0 3% 0 0"
              style={{ alignSelf: "flex-end" }}
              onClick={() => navigate(`../project/${task.data.projectID}`)}
            ></ButtonImg>
          </BackButton>
          <EditableText text={task.data.name}></EditableText>
          <OptionsButton>
            <DropMenuButton src={Detail} alt="more options">
              <DropMenuOption
                callback={() => (
                  deleteTask(task),
                  navigate(`../project/${task.data.projectID}`)
                )}
              >
                Remove
              </DropMenuOption>
            </DropMenuButton>
          </OptionsButton>
        </BackAndNameAndOptions>
        <Text size={1}>
          {ConvertToStringTime(task.data.timeLeft)} spend on task so far
        </Text>
        <Text size={1} margin="0 0 2% 0">
          expected {ConvertToStringTime(task.data.totalTime)}
        </Text>
        <NewProject onClick={() => ""}>
          <NewProjectImg src={Clock} alt=""></NewProjectImg>
          Start
        </NewProject>
      </Head>
      <AllCategories>
        {showDesc && (
          <Category hue={100} name="Description">
            <TaskDescriptionBox
              value={task.data.desc}
              id={id}
            ></TaskDescriptionBox>
          </Category>
        )}
        {showCheckboxes && (
          <Category hue={100} name="Checkbox">
            {task.data.checkboxes &&
              Object.entries(task.data.checkboxes)
                .sort((timeA, timeB) => timeA[1].createdAt - timeB[1].createdAt)
                .sort(
                  (valueA, valueB) =>
                    Number(valueA[1].value) - Number(valueB[1].value)
                )
                .map((checkbox) => (
                  <CheckBox
                    checkboxData={checkbox}
                    key={Math.random().toFixed(5)}
                    projectId={id}
                  ></CheckBox>
                ))}
            {addCardMenu && (
              <CheckBox
                template={true}
                closeCardMenu={setAddCardMenu}
                projectId={id}
              ></CheckBox>
            )}
            <NewCheckboxButton onClick={() => setAddCardMenu(true)}>
              <NewProjectImg src={Add} alt=""></NewProjectImg>
              add New
            </NewCheckboxButton>
          </Category>
        )}
        <Category hue={100} name="Settings">
          <TaskOption optionName="Estimated Time" type="TextData"></TaskOption>
          <TaskOption
            optionName="Task Status"
            type="Cycle"
            callback={updateStatus}
            showOption={task.data.status}
          ></TaskOption>
          <TaskOption
            optionName="Show Checkboxes"
            type="Toggle"
            setOption={setshowCheckboxes}
            showOption={showCheckboxes}
          ></TaskOption>
          <TaskOption
            optionName="Show Description"
            type="Toggle"
            setOption={setshowDesc}
            showOption={showDesc}
          ></TaskOption>
        </Category>
      </AllCategories>
    </>
  );
};
export default TaskOverview;
const Head = styled.div<{ hue: number }>`
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  padding: 5px 5%;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ hue }) => `hsla(${hue}, 20%, 74%, 1)`};
  width: 100%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid hsla(0, 2%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
const BackAndNameAndOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1%;
  margin-top: 2%;
`;
const BackButton = styled.div`
  width: 15%;
  display: flex;
  align-items: flex-end;
`;

const OptionsButton = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const ButtonImg = styled.button<{
  src: string;
  margin?: string;
  size: number[];
}>`
  display: flex;
  align-self: center;
  height: ${({ size }) => size[0]}px;
  width: ${({ size }) => size[1]}px;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const Text = styled.p<{
  size: number;
  weight?: number;
  margin?: string;
  padding?: string;
}>`
  font-style: normal;
  /* width: 90%; */
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: black;
  span {
    font-weight: 900;
  }
`;
const NewProject = styled.button`
  display: flex;
  position: absolute;
  right: 10%;
  bottom: 10%;
  align-items: center;
  justify-content: center;
  /* margin-right: 5%; */
  border-radius: 5px;
  padding: 1% 4%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  cursor: pointer;
`;
const NewCheckboxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  border-radius: 5px;
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  backdrop-filter: blur(15px);
  cursor: pointer;
`;
const NewProjectImg = styled.img`
  width: 15px;
  padding-right: 5px;
`;
const AllCategories = styled.div`
  /* margin-top: 0rem; */
  width: 100%;
  padding-top: 5%;
  overflow-y: auto;
  overflow-x: hidden;
`;
