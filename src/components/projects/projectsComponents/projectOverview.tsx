import styled from "styled-components";
import useDataFinder from "../../hooks/useDataFinder";
import { useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import Category from "../../custom/category";
import TaskCard from "../tasksComponents/taskCard/taskCard";
import { ProjectsData } from "../../../API/getUserData";
import { filterTPByName } from "../utils/filtersAndSorters";
import TaskCardTemplate from "../tasksComponents/taskCard/taskCardTemplate";
import ProjectHead from "./projectHead";
import DisplayText from "../../styled/components/displayText";
import useTheme from "../../hooks/useTheme";
const Project: React.FC = () => {
  const [templateTask, setTemplateTask] = useState(false);
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const [searchText, setSearchText] = useState("");

  const { id } = useParams();
  const project = useDataFinder<ProjectsData>(id);
  const {
    getColor: { categoryActive, categoryOnHold, categoryDone },
  } = useTheme();
  const openTempateProject = () => {
    setTemplateTask(true);
  };

  if (!project) return <Navigate to="/projects" replace />;
  return (
    <>
      <ProjectHead
        searchText={searchText}
        setSearchText={setSearchText}
        openTemplate={openTempateProject}
        newProjectButtonRef={buttonNewRef}
      />
      <AllTasks>
        {Object.keys(project.tasks).length === 0 && (
          <NoTaskDisplay>
            <DisplayText size={1.4} weight={600} margin="0.5rem 0">
              This project is empty
            </DisplayText>
            <DisplayText weight={500} margin="0 0 1rem 0">
              Consider adding some tasks
            </DisplayText>
          </NoTaskDisplay>
        )}
        <Category name="Active" overrideColor={categoryActive}>
          {templateTask && (
            <TaskCardTemplate
              referenceButton={buttonNewRef}
              isTemplateTask={templateTask}
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
        <Category name="On Hold" overrideColor={categoryOnHold}>
          {project.tasks
            .filter((e) => e.data.status === "On Hold")
            .filter((task) => filterTPByName(task, searchText))
            .map((e, i) => (
              <TaskCard key={i} task={e}></TaskCard>
            ))}
        </Category>
        <Category name="Done" overrideColor={categoryDone}>
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

const AllTasks = styled.div`
  width: 100%;
  margin-top: -0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5%;
`;
const NoTaskDisplay = styled.div`
  text-align: center;
`;
