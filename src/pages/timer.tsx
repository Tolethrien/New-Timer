import styled from "styled-components";
import PageWrap from "../components/styled/pageWrap";
import { useContext, useMemo, useState } from "react";
import { appContext } from "../components/providers/appProvider";
import Head from "../components/styled/head";
import DisplayText from "../components/styled/displayText";
import { clockContext } from "../components/providers/clockProvider";
import Checkboxes from "../components/projects/tasksComponents/checkboxes";
import CircularProgressBar from "../components/styled/circularProgresBar";
import { ConvertToStringTime } from "../components/hooks/convertToTime";
import TimerButtons from "../components/timer/timerButtons";
const Timer: React.FC = () => {
  const {
    userData,
    displayMode: { displayMode },
  } = useContext(appContext);
  const { barProgress, taskInProgress, timeLeft } = useContext(clockContext);
  const [showCheckboxComponent, setShowCheckboxComponent] = useState(false);

  const getTaskData = userData
    .find((e) => e.id === taskInProgress?.project)
    ?.tasks.find((e) => e.id === taskInProgress?.task)?.data;

  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600}>
          Timer
        </DisplayText>
        <DisplayText weight={500}>
          {taskInProgress
            ? `currently working on ${getTaskData!.name} task`
            : "You Are now in Free Mode"}
        </DisplayText>
      </Head>
      <Clock showCheckboxComponent={showCheckboxComponent}>
        <CircularProgressBar
          config={{
            size: 220,
            trackWidth: 16,
            trackHue: 200,
            indicatorWidth: 16,
            indicatorHue: 320,
            indicatorCap: "round",
            glow: { strength: 10, hue: 108 },
            text: {
              family: "roboto",
              size: 2.8,
              background: true,
              opacity: 0.5,
            },
          }}
          progress={barProgress}
        >
          {ConvertToStringTime(timeLeft)}
        </CircularProgressBar>
        <TimerButtons showCheckboxComponent={showCheckboxComponent} />
      </Clock>
      <ButtomHead displayMode={displayMode}>
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
              <Checkboxes checkboxes={getTaskData!.checkboxes} displayOnly />
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

const Clock = styled.div<{ showCheckboxComponent: boolean }>`
  display: flex;
  flex-direction: ${({ showCheckboxComponent }) =>
    showCheckboxComponent ? "row" : "column"};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-block: 1rem;
  flex-grow: 1;
`;
const ButtomHead = styled.div<{ displayMode: string }>`
  display: grid;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ displayMode }) =>
    displayMode === "light"
      ? `hsla(40, 76%, 69%, 0.8)`
      : `hsla(261, 16%, 40%, 0.8)`};
  border-radius: 10px 10px 0 0;
  backdrop-filter: blur(15px);
  border: 1px solid
    ${({ displayMode }) =>
      displayMode === "light" ? `hsla(0, 2%, 88%, 1)` : `hsla(0, 0%, 37%, 1)`};
  border-bottom: none;
`;
const ShowMore = styled.div`
  width: 20%;
  height: 0.4rem;
  background-color: hsla(0, 0%, 87%, 0.68);
  border-radius: 10px 10px 0 0;
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
  max-height: 35vh;
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
