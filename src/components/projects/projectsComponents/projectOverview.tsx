import styled from "styled-components";
import { RouteData, RoutesChange } from "../../../pages/projects";
import FindData from "../../hooks/findData";
import { useState, useContext } from "react";
import Add from "../../../Icons/Add.svg";
import BackArrow from "../../../Icons/BackArrow.svg";
import Detail from "../../../Icons/Detail.svg";
import Loop from "../../../Icons/Loop.svg";
import Edit from "../../../Icons/Edit.svg";
import RoundSwap from "../../../Icons/RoundSwap.svg";
import { ProjectsData } from "../../../API/getUserData";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { deleteProject, addTask } from "../../../API/handleDocs";
import { colors } from "../../../API/handleDocs";
interface ProjectProps {
  changeRoute: (route: RoutesChange) => void;
  renderRoute: RouteData;
}
interface StyleProps {}
const Project: React.FC<ProjectProps> = ({ renderRoute, changeRoute }) => {
  const project = FindData(renderRoute) as ProjectsData;
  const [showAll, setShowAll] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const {
    secondary: { secondaryColor },
  } = useContext(appContext);

  const taskDone = (tasks: { data: { finished: boolean } }[]) => {
    let done = tasks.filter((e) => e.data.finished === true);
    return done.length > 0 ? done.length : 0;
  };
  const totalTimeOnTasks = () => {
    return project?.tasks.reduce(
      (acu, element) => acu + element.data.totalTime,
      0
    );
  };
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filterByName = (value: { data: { name: string } }) => {
    return value.data.name.toLowerCase().includes(searchText.toLowerCase());
  };

  if (!project) return <p>Loading...</p>;
  return (
    <Head>
      <BackAndNameAndOptions>
        <ButtonImg
          src={BackArrow}
          size={[25, 60]}
          margin="0 3% 0 0"
          style={{ alignSelf: "flex-end" }}
          onClick={() => changeRoute("back")}
        ></ButtonImg>
        <div>
          {editTitle ? (
            <NameEditInput
              placeholder={project.data.name}
              autoFocus={true}
            ></NameEditInput>
          ) : (
            <Text size={1.5} weight={600}>
              ProjectLazarus
            </Text>
          )}
        </div>
        {showAll && (
          <ButtonImg
            src={Edit}
            size={[15, 15]}
            margin="0 0 0 2%"
            onClick={() => setEditTitle(!editTitle)}
          ></ButtonImg>
        )}
        <ButtonImg src={Detail} size={[25, 25]} margin="0 0 0 30%"></ButtonImg>
      </BackAndNameAndOptions>
      {showAll && (
        <>
          <Text size={1} margin="4% 0 0 0">
            you spend a 2 hours total on this project
          </Text>
          <Text size={1} margin="1% 0 3% 0">
            Expected time is 40 hours!
          </Text>
          <ProjectStatus>
            <Text size={1}>
              Currently Project is <span>Active</span>
            </Text>
            <ButtonImg
              src={RoundSwap}
              size={[25, 25]}
              margin="0 0 0 5%"
            ></ButtonImg>
          </ProjectStatus>
          <ColorDetail>
            <Text size={1} padding="1% 0 0 0">
              Project color is <span>Pink</span>
            </Text>
            <ColorPicker>
              {colors.map((e) => (
                <ColorToPick
                  current={e === project.data.color}
                  hue={e}
                ></ColorToPick>
              ))}
            </ColorPicker>
          </ColorDetail>
        </>
      )}
      <Text size={1.5} weight={600} padding="2% 0 4% 0">
        You have 8 task still to do! <br />
        (15 total)
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
        <NewProject onClick={() => addTask("ss", "Inter Stelaris Kanis Lupus")}>
          <NewProjectImg src={Add} alt=""></NewProjectImg>
          Add Task
        </NewProject>
      </SearchAndAdd>
      <MoreInfo onClick={() => setShowAll((prev) => !prev)}></MoreInfo>
    </Head>
  );
};
export default Project;
const Head = styled.div`
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  padding: 5px 5%;
  justify-content: center;
  flex-direction: column;
  background-color: hsla(233, 20%, 74%, 1);
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
const NameEditInput = styled.input`
  height: 95%;
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
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 1)`};
  margin-left: 5%;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25);
  ${({ current }) =>
    current &&
    `
  width: 2.2vw;
  height: 2.2vw;
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

// <Glass size="inline">
//   <Head>
//     <BackButton
//       src={Arrow}
//       alt="go back"
//       onClick={() => changeRoute("back")}
//     />
//     <Name>{project.data.name}</Name>
//     <DropMenuButton src={Detail} alt="more options">
//       <DropMenuOption>Edit</DropMenuOption>
//       <DropMenuOption
//         callback={() => (deleteProject(project), changeRoute("back"))}
//       >
//         Remove
//       </DropMenuOption>
//     </DropMenuButton>
//   </Head>
//   <Details>
//     <TotalTime>Total Time:{totalTimeOnTasks()} min.</TotalTime>
//     <EstimatedTime>szacowany czas</EstimatedTime>
//     <TasksDone>
//       zadania: {taskDone(project.tasks) + "/" + project.tasks.length}
//     </TasksDone>
//   </Details>
//   <TaskData>
//     <TasksHeader>{"head(5)"}</TasksHeader>
//     <AddButton
//       src={Add}
//       alt="add new project"
//       onClick={() => addTask(project.id, searchText)}
//     />
//     <SearchBar onChange={(e) => setSearchText(e.target.value)}></SearchBar>
//     <AllTasks>
//       {project.tasks.filter(filterByName).map((e) => (
//         <TaskWrap
//           key={e.id}
//           onClick={() => changeRoute({ taskId: e.id })}
//           color={secondaryColor}
//         >
//           <TaskName>{e.data.name}</TaskName>
//           <TaskTime>{e.data.totalTime} min</TaskTime>
//           <TaskFinished done={e.data.finished}></TaskFinished>
//         </TaskWrap>
//       ))}
//     </AllTasks>
//   </TaskData>
// </Glass>
