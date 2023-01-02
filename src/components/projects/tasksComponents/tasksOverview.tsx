import styled from "styled-components";
import FindData from "../../hooks/findData";
import { TasksData } from "../../../API/getUserData";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { clockContext } from "../../providers/clockProvider";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { deleteTask, updateTask } from "../../../API/handleDocs";
import {
  BackArrow,
  Edit,
  Clock,
  Detail,
  CheckBoxEmpty,
  CheckBoxFill,
} from "../../utils/icons";
import CheckBox from "../projectsComponents/checkbox";
import Category from "../projectsComponents/category";
import TaskDescriptionBox from "../projectsComponents/taskDescriptionBox";
interface TasksOverviewProps {}
interface StyleProps {}
const TaskOverview: React.FC<TasksOverviewProps> = () => {
  const { id } = useParams();
  const task = FindData(id!) as TasksData;
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(false);
  const [changeName, setChangeName] = useState("");
  const { setClock } = useContext(clockContext);
  const {
    newColor: { newColor },
  } = useContext(appContext);
  // const setAndOpenTimer = () => {
  //   setClock(task?.data.totalTime, task!.id);
  //   navigate("/timer");
  //   currentWindow.set(1);
  // };

  const updateName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask(id!, { name: changeName });
    setEditTitle(false);
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
          <NameSlot>
            {editTitle ? (
              <NameEditForm onSubmit={(event) => updateName(event)}>
                <NameEditInput
                  placeholder={task.data.name}
                  autoFocus={true}
                  onChange={(e) => setChangeName(e.target.value)}
                ></NameEditInput>
              </NameEditForm>
            ) : (
              <Text size={1.5} weight={600}>
                {task.data.name.length > 20
                  ? task.data.name.slice(0, 20) + "..."
                  : task.data.name}
              </Text>
            )}

            <ButtonImg
              src={Edit}
              size={[15, 15]}
              margin="0 0 0 5%"
              onClick={() => setEditTitle(!editTitle)}
            ></ButtonImg>
          </NameSlot>
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
        <Text size={1}>2 hours spend on task so far</Text>
        <Text size={1} margin="0 0 2% 0">
          expected 5 hours
        </Text>
        <NewProject onClick={() => ""}>
          <NewProjectImg src={Clock} alt=""></NewProjectImg>
          Start
        </NewProject>
      </Head>
      <Category hue={100} name="Description">
        <TaskDescriptionBox></TaskDescriptionBox>
      </Category>
      <Category hue={100} name="Checkbox">
        <CheckBox></CheckBox>
        <CheckBox></CheckBox>
      </Category>
      <Category hue={100} name="Options">
        <CheckBox></CheckBox>
        <CheckBox></CheckBox>
      </Category>
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
const NameSlot = styled.div`
  width: 75%;
  display: flex;
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
const NameEditForm = styled.form`
  width: 80%;
`;

const NameEditInput = styled.input`
  border: none;
  outline: none;
  height: 100%;
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #414141;
    font-weight: 600;
    font-size: 1.2rem;
  }
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
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  cursor: pointer;
`;
const NewProjectImg = styled.img`
  width: 15px;
  padding-right: 5px;
`;
