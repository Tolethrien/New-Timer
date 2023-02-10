import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProjectsData } from "../../../API/getUserData";
import { updateProject, updateStatus } from "../../../API/handleDocs";
import { colors } from "../../../API/utils";
import ButtonAsIcon from "../../custom/buttonAsIcon";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import Head from "../../custom/head";
import useDataFinder from "../../hooks/useDataFinder";
import useTheme from "../../hooks/useTheme";
import DisplayText from "../../styled/components/displayText";
import { Add, RoundSwap } from "../../utils/icons";
import { randomKey } from "../../utils/randomKey";
import { convertTimeToString } from "../../utils/timeConverters";
import SearchBox from "../custom/searchBox";
import TitleHeading from "../custom/titleHeading";
interface ProjectHeadProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  openTemplate: () => void;
  newProjectButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
}
interface TaskDataCalculation {
  done: number;
  toDo: number;
  totalTasks: number;
  totalTimeOnTasks: number;
  currentTimeOnTasks: number;
}
const ProjectHead: React.FC<ProjectHeadProps> = ({
  searchText,
  setSearchText,
  openTemplate,
  newProjectButtonRef,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { id } = useParams();
  const project = useDataFinder<ProjectsData>(id)!;
  const {
    theme,
    getColor: { projectCardColorTone, showMoreButtonColor },
  } = useTheme();

  const updateColor = (e: number) => {
    updateProject(id!, { color: e });
  };
  const TasksInfo = tasksCompletion();

  function tasksCompletion() {
    let data: TaskDataCalculation = {
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
  return (
    <Head>
      <TitleHeading />
      {showAll && (
        <>
          <DisplayText>
            you spend a {convertTimeToString(TasksInfo.currentTimeOnTasks)}{" "}
            total on this project
          </DisplayText>
          <DisplayText>
            Expected time is {convertTimeToString(TasksInfo.totalTimeOnTasks)}!
          </DisplayText>
          <ProjectCategory>
            <DisplayText size={1.2}>
              Currently Project is <b>{project.data.status}</b>
            </DisplayText>
            <ButtonAsIcon
              src={RoundSwap}
              size={[1.5, 1.5]}
              onClick={() => updateStatus({ document: project, id: id! })}
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
                  projectCardColorTone={projectCardColorTone}
                  displayMode={theme}
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
          onClick={openTemplate}
          text={"Add New"}
          reference={newProjectButtonRef}
        />
      </ManagingProject>
      <MoreInfoButton
        showMoreButtonColor={showMoreButtonColor}
        onClick={() => setShowAll((prev) => !prev)}
      ></MoreInfoButton>
    </Head>
  );
};
export default ProjectHead;
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
  gap: 0.2rem;
`;
const ColorToPick = styled.div<{
  current: boolean;
  hue: number;
  displayMode: string;
  projectCardColorTone: string;
}>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: ${({ hue, projectCardColorTone }) =>
    `hsla(${hue}, 30%, ${projectCardColorTone}, 1)`};
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25);
  ${({ current }) =>
    current &&
    `
  width: 1.6rem;
  height: 1.6rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`;

const MoreInfoButton = styled.button<{ showMoreButtonColor: string }>`
  width: 30%;
  height: 0.5rem;
  background-color: ${({ showMoreButtonColor }) => showMoreButtonColor};
  border: none;
  align-self: center;
  border-radius: 10px;
  cursor: pointer;
`;

const ManagingProject = styled.div`
  width: 100%;
  display: flex;
  margin: 3% 0;
  justify-content: space-between;
`;
