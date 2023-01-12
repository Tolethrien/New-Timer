import styled from "styled-components";
import FindData from "../../hooks/findData";
import { useState, useRef } from "react";
import { Add, RoundSwap } from "../../utils/icons";
import {
  updateProject,
  ProjectStatuses,
  colors,
} from "../../../API/handleDocs";
import { useParams } from "react-router-dom";
import Category from "../custome/category";
import TaskCard from "../tasksComponents/taskCard/taskCard";
import { ProjectsData } from "../../../API/getUserData";
import { ConvertToStringTime } from "../../hooks/convertToTime";
import LoadingData from "../../custom/loadingData";
import Head from "../../styled/head";
import DisplayText from "../../styled/displayText";
import TitleHeading from "../custome/titleHeading";
import { ButtonAsIcon } from "../../styled/buttonAsIcon";
import { randomKey } from "../../utils/randomKey";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import SearchBox from "../custome/searchBox";
import { filterTPByName } from "../utils/filtersAndSorters";
import TaskCardTemplate from "../tasksComponents/taskCard/taskCardTemplate";
import updateStatus from "../utils/updateStatus";
interface ProjectProps {}
interface StyleProps {}
const Project: React.FC<ProjectProps> = () => {
  const [showAll, setShowAll] = useState(true);
  const [templateTask, setTemplateTask] = useState(false);
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const project = FindData(id) as ProjectsData;
  const TasksInfo = tasksCompletion();

  const updateColor = (e: number) => {
    updateProject(id!, { color: e });
  };
  const openTempateProject = () => {
    setTemplateTask(true);
  };
  function tasksCompletion() {
    let data = {
      done: 0,
      toDo: 0,
      totalTasks: 0,
      totalTimeOnTasks: 0,
      currentTimeOnTasks: 0,
    };
    project?.tasks.forEach((e) => {
      e.data.status === "Done" ? data.done++ : data.toDo++;
      data.totalTimeOnTasks += e.data.timeExpected;
      data.currentTimeOnTasks += e.data.timeSpend;
    });
    project && (data.totalTasks = project?.tasks.length);
    return data;
  }

  if (!project) return <LoadingData />;
  return (
    <>
      <Head>
        <TitleHeading type={"project"} document={project}></TitleHeading>
        {showAll && (
          <>
            <DisplayText>
              you spend a {ConvertToStringTime(TasksInfo.currentTimeOnTasks)}{" "}
              total on this project
            </DisplayText>
            <DisplayText>
              Expected time is {ConvertToStringTime(TasksInfo.totalTimeOnTasks)}
              !
            </DisplayText>
            <ProjectCategory>
              <DisplayText size={1.2}>
                Currently Project is <b>{project.data.status}</b>
              </DisplayText>
              <ButtonAsIcon
                src={RoundSwap}
                size={[1.5, 1.5]}
                onClick={() =>
                  updateStatus({ document: project, id: id!, type: "project" })
                }
              ></ButtonAsIcon>
            </ProjectCategory>
            <ProjectCategory>
              <DisplayText size={1.2}>
                Project color is{" "}
                <b>
                  {
                    Object.entries(colors).find(
                      (e) => e[1] === project!.data.color
                    )![0]
                  }
                </b>
              </DisplayText>
              <ColorPicker>
                {Object.values(colors).map((e) => (
                  <ColorToPick
                    current={e === project.data.color}
                    hue={e}
                    key={randomKey()}
                    onClick={() => updateColor(e)}
                  ></ColorToPick>
                ))}
              </ColorPicker>
            </ProjectCategory>
          </>
        )}
        <DisplayText size={1.5} weight={600}>
          You have {TasksInfo.toDo} task still to do! <br />(
          {TasksInfo.totalTasks} total)
        </DisplayText>
        <ManagingProject>
          <SearchBox onChange={setSearchText} value={searchText} />
          <ButtonWithIcon
            alt=""
            src={Add}
            onClick={openTempateProject}
            text={"Add New"}
            reference={buttonNewRef}
          />
        </ManagingProject>
        <MoreInfoButton
          onClick={() => setShowAll((prev) => !prev)}
        ></MoreInfoButton>
      </Head>

      <AllTasks>
        <Category name="Active" hue={245}>
          {templateTask && (
            <TaskCardTemplate
              referenceButton={buttonNewRef}
              setTemplateTask={setTemplateTask}
            ></TaskCardTemplate>
          )}
          {project.tasks
            .filter((task) => task.data.status === "Active")
            .filter((task) => filterTPByName(task, searchText))
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
        <Category name="On Hold" hue={360}>
          {project.tasks
            .filter((e) => e.data.status === "On Hold")
            .filter((task) => filterTPByName(task, searchText))
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
        <Category name="Done" hue={115}>
          {project.tasks
            .filter((e) => e.data.status === "Done")
            .filter((task) => filterTPByName(task, searchText))
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
      </AllTasks>
    </>
  );
};

export default Project;

const ProjectCategory = styled.div`
  width: 100%;
  display: flex;
  margin: 2% 0;
  align-items: center;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;
const ColorToPick = styled.div<{ current: boolean; hue: number }>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 1)`};
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25);
  ${({ current }) =>
    current &&
    `
  width: 1.6rem;
  height: 1.6rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`;

const MoreInfoButton = styled.button`
  width: 30%;
  height: 10px;
  background-color: hsla(0, 0%, 87%, 0.68);
  border: none;
  align-self: center;
  border-radius: 10px;
`;
const AllTasks = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5%;
`;
const ManagingProject = styled.div`
  width: 100%;
  display: flex;
  margin: 3% 0;
  justify-content: space-between;
`;
