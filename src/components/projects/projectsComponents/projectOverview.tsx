import styled from "styled-components";
import FindData from "../../hooks/findData";
import { useState, useContext } from "react";
import {
  Add,
  Loop,
  Edit,
  RoundSwap,
  BackArrow,
  Detail,
} from "../../utils/icons";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import {
  deleteProject,
  updateProject,
  ProjectStatuses,
  colors,
} from "../../../API/handleDocs";
import { useNavigate, useParams } from "react-router-dom";
import Category from "./category";
import TaskCard from "./taskCard";
import { ProjectsData } from "../../../API/getUserData";
interface ProjectProps {}
interface StyleProps {}
const Project: React.FC<ProjectProps> = () => {
  const [showAll, setShowAll] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const [addCardMenu, setAddCardMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [changeName, setChangeName] = useState("");
  const navigate = useNavigate();

  const {
    newColor: { newColor },
  } = useContext(appContext);
  const { id } = useParams();
  const project = FindData(id) as ProjectsData;
  const tasksCompletion = () => {
    let data = { done: 0, toDo: 0, totalTasks: 0, totalTime: 0, timeSpend: 0 };
    project?.tasks.forEach((e) => {
      e.data.status === "Done" ? data.done++ : data.toDo++;
      data.totalTime += e.data.totalTime;
      data.timeSpend += e.data.timeLeft;
    });
    project && (data.totalTasks = project?.tasks.length);
    return data;
  };
  const TasksInfo = tasksCompletion();
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filterByName = (value: { data: { name: string } }) => {
    return value.data.name.toLowerCase().includes(searchText.toLowerCase());
  };
  const updateName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProject(id!, { name: changeName });
    setEditTitle(false);
  };
  const updateStatus = () => {
    let st = ProjectStatuses.indexOf(project?.data.status);
    let newSt = st === ProjectStatuses.length - 1 ? 0 : (st += 1);
    // console.log(newSt);
    updateProject(id!, { status: ProjectStatuses[newSt] });
  };
  const updateColor = (e: number) => {
    updateProject(id!, { color: e });
  };

  if (!project)
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
              onClick={() => navigate("..")}
            ></ButtonImg>
          </BackButton>
          <NameSlot>
            {editTitle ? (
              <NameEditForm onSubmit={(event) => updateName(event)}>
                <NameEditInput
                  placeholder={project.data.name}
                  autoFocus={true}
                  onChange={(e) => setChangeName(e.target.value)}
                ></NameEditInput>
              </NameEditForm>
            ) : (
              <Text size={1.5} weight={600}>
                {project.data.name.length > 20
                  ? project.data.name.slice(0, 20) + "..."
                  : project.data.name}
              </Text>
            )}
            {showAll && (
              <ButtonImg
                src={Edit}
                size={[15, 15]}
                margin="0 0 0 5%"
                onClick={() => setEditTitle(!editTitle)}
              ></ButtonImg>
            )}
          </NameSlot>
          <OptionsButton>
            <DropMenuButton src={Detail} alt="more options">
              <DropMenuOption
                callback={() => (deleteProject(project), navigate(".."))}
              >
                Remove
              </DropMenuOption>
            </DropMenuButton>
          </OptionsButton>
        </BackAndNameAndOptions>
        {showAll && (
          <>
            <Text size={1} margin="4% 0 0 0">
              you spend a {TasksInfo.timeSpend} hours total on this project
            </Text>
            <Text size={1} margin="1% 0 3% 0">
              Expected time is {TasksInfo.totalTime} hours!
            </Text>
            <ProjectStatus>
              <Text size={1}>
                Currently Project is <span>{project.data.status}</span>
              </Text>
              <ButtonImg
                src={RoundSwap}
                size={[25, 25]}
                margin="0 0 0 5%"
                onClick={() => updateStatus()}
              ></ButtonImg>
            </ProjectStatus>
            <ColorDetail>
              <Text size={1} padding="1% 0 0 0">
                Project color is{" "}
                <span>
                  {
                    Object.entries(colors).find(
                      (e) => e[1] === project!.data.color
                    )![0]
                  }
                </span>
              </Text>
              <ColorPicker>
                {Object.values(colors).map((e) => (
                  <ColorToPick
                    current={e === project.data.color}
                    hue={e}
                    key={e}
                    onClick={() => updateColor(e)}
                  ></ColorToPick>
                ))}
              </ColorPicker>
            </ColorDetail>
          </>
        )}
        <Text size={1.5} weight={600} padding="2% 0 4% 0">
          You have {TasksInfo.toDo} task still to do! <br />(
          {TasksInfo.totalTasks} total)
        </Text>
        <SearchAndAdd>
          <SearchBox>
            <SearchBoxImg src={Loop} alt="searchBar"></SearchBoxImg>
            <SearchBoxInput
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setText(e)}
            ></SearchBoxInput>
          </SearchBox>
          <NewProject onClick={() => setAddCardMenu(true)}>
            <NewProjectImg src={Add} alt=""></NewProjectImg>
            Add Task
          </NewProject>
        </SearchAndAdd>
        <MoreInfo onClick={() => setShowAll((prev) => !prev)}></MoreInfo>
      </Head>

      <AllTasks>
        <Category name="Active" hue={245}>
          {addCardMenu && (
            <TaskCard
              template={true}
              setAddCardMenu={setAddCardMenu}
            ></TaskCard>
          )}
          {project.tasks
            .filter((e) => e.data.status === "Active")
            .filter(filterByName)
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
        <Category name="On Hold" hue={360}>
          {project.tasks
            .filter((e) => e.data.status === "On Hold")
            .filter(filterByName)
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
        <Category name="Done" hue={115}>
          {project.tasks
            .filter((e) => e.data.status === "Done")
            .filter(filterByName)
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
      </AllTasks>
    </>
  );
};

export default Project;
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
const AddCard = styled.div`
  color: black;
  width: 100%;
  height: 45px;
  margin-top: 0.5%;
  border-radius: 5px;
  background-color: hsla(169, 77%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AddNewForm = styled.form``;
const AddNewInput = styled.input`
  margin-left: 5%;
  font-size: 1.2rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid grey;
  outline: none;
`;
const AddNewCloseButton = styled.button``;

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
const ProjectStatus = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ColorDetail = styled.div`
  width: 100%;
  display: flex;
  padding-top: 2%;
  justify-content: space-between;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;
const ColorToPick = styled.div<{ current: boolean; hue: number }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 1)`};
  margin-left: 5%;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25);
  ${({ current }) =>
    current &&
    `
  width: 25px;
  height: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
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
const SearchAndAdd = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3%;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 1.5rem;
  /* margin-left: 5%; */
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  width: 50%;
  height: 100%;
`;
const SearchBoxInput = styled.input`
  background-color: transparent;
  border: none;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: #414141;
    font-weight: 600;
  }
`;
const SearchBoxImg = styled.img`
  height: 60%;
  padding-left: 10px;
`;
const NewProject = styled.button`
  display: flex;
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
const MoreInfo = styled.div`
  width: 30%;
  height: 5px;
  background-color: hsla(0, 0%, 87%, 0.68);
  align-self: center;
  border-radius: 10px;
`;
const AllTasks = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5%;
`;
