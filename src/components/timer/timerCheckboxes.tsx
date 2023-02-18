import React, { useState } from "react";
import styled from "styled-components";
import { TasksData } from "../../API/getUserData";
import useClock from "../hooks/useClock";
import useDataFinder from "../hooks/useDataFinder";
import useTheme from "../hooks/useTheme";
import Checkboxes from "../projects/tasksComponents/checkboxes";
import DisplayText from "../styled/components/displayText";
interface TimerChecboxesProps {
  showCheckboxes: boolean;
  setCheckboxes: React.Dispatch<React.SetStateAction<boolean>>;
}
const TimerChecboxes: React.FC<TimerChecboxesProps> = ({
  setCheckboxes,
  showCheckboxes,
}) => {
  const {
    getClock: { taskInProgress },
  } = useClock();
  const { data } = useDataFinder<TasksData>(taskInProgress?.task) ?? {
    data: undefined,
  };
  const {
    getColor: { appColorPrimary, borderColor },
  } = useTheme();

  return (
    <ComponentBody bodyColor={appColorPrimary} borderColor={borderColor}>
      <CheckboxTitleBar onClick={() => setCheckboxes((prev) => !prev)}>
        <DisplayText size={1.5} weight={500} margin="5px 0">
          Checkboxes
        </DisplayText>
        <ShowMore></ShowMore>
      </CheckboxTitleBar>
      {showCheckboxes &&
        (taskInProgress?.task ? (
          <CheckboxesScroller>
            {Object.keys(data!.checkboxes).length > 0 ? (
              <Checkboxes
                checkboxes={data!.checkboxes}
                showComplete={false}
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
    </ComponentBody>
  );
};
export default TimerChecboxes;
const ComponentBody = styled.div<{ bodyColor: string; borderColor: string }>`
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
