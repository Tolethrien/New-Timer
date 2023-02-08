import styled from "styled-components";
import PageWrap from "../components/styled/components/pageWrap";
import { useState } from "react";
import Head from "../components/custom/head";
import DisplayText from "../components/styled/components/displayText";
import Checkboxes from "../components/projects/tasksComponents/checkboxes";
import Clock from "../components/timer/clockComponent";
import useTheme from "../components/hooks/useTheme";
import useDataFinder from "../components/hooks/useDataFinder";
import useClock from "../components/hooks/useClock";
const Timer: React.FC = () => {
  const userData = useDataFinder("all");
  const { taskInProgress } = useClock();
  const [showCheckboxComponent, setShowCheckboxComponent] = useState(false);
  const {
    getColor: { appColorPrimary, borderColor },
  } = useTheme();
  const { projectData, taskData } = findDataInfo();

  function findDataInfo() {
    let project = userData?.find((e) => e.id === taskInProgress?.project);
    let taskData = project?.tasks.find(
      (e) => e.id === taskInProgress?.task
    )?.data;
    return { projectData: project?.data, taskData };
  }
  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600}>
          Timer
        </DisplayText>
        <DisplayText weight={500}>
          {taskInProgress
            ? `currently working on ${taskData?.name}`
            : "You Are now in Free Mode"}
        </DisplayText>
        {taskInProgress && (
          <DisplayText weight={500}>In Project {projectData?.name}</DisplayText>
        )}
      </Head>
      <Clock showCheckboxComponent={showCheckboxComponent} />
      <ButtomHead bodyColor={appColorPrimary} borderColor={borderColor}>
        <CheckboxTitleBar
          onClick={() => setShowCheckboxComponent((prev) => !prev)}
        >
          <DisplayText size={1.5} weight={500} margin="5px 0">
            Checkboxes
          </DisplayText>
          <ShowMore></ShowMore>
        </CheckboxTitleBar>
        {showCheckboxComponent &&
          (taskInProgress?.task ? (
            <CheckboxesScroller>
              {Object.keys(taskData!.checkboxes).length > 0 ? (
                <Checkboxes
                  checkboxes={taskData!.checkboxes}
                  displayOnly
                  useID={taskInProgress.task}
                />
              ) : (
                <DisplayText>No Checkboxes in this task</DisplayText>
              )}
            </CheckboxesScroller>
          ) : (
            <DisplayText margin="1rem 0.5rem">
              No checkboxes to show, start a task first!
            </DisplayText>
          ))}
      </ButtomHead>
    </PageWrap>
  );
};
export default Timer;

const ButtomHead = styled.div<{ bodyColor: string; borderColor: string }>`
  display: grid;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ bodyColor }) => bodyColor};
  border-radius: 10px 10px 0 0;
  backdrop-filter: blur(15px);
  border: 1px solid ${({ borderColor }) => borderColor};
  border-bottom: none;
`;
const ShowMore = styled.button`
  width: 20%;
  height: 0.4rem;
  background-color: hsla(0, 0%, 87%, 0.68);
  border-radius: 10px 10px 0 0;
  border: none;
`;
const CheckboxTitleBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 0.2rem;
  z-index: 10;
  box-shadow: 0px 0px 8px 4px hsla(0, 0%, 0%, 0.3);
  cursor: pointer;
`;
const CheckboxesScroller = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-y: scroll;
  padding-block: 0.7rem;
  box-sizing: border-box;
  > * {
    margin-inline: auto;
    width: 96%;
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
`;
