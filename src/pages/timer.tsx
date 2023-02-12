import PageWrap from "../components/styled/components/pageWrap";
import Head from "../components/custom/head";
import DisplayText from "../components/styled/components/displayText";
import useDataFinder from "../components/hooks/useDataFinder";
import useClock from "../components/hooks/useClock";
import TimerClock from "../components/timer/timerClock";
import TimerChecboxes from "../components/timer/timerCheckboxes";
import { ProjectsData, TasksData } from "../API/getUserData";
import { useState } from "react";
const Timer: React.FC = () => {
  const {
    getClock: { taskInProgress },
  } = useClock();
  const {
    data: { name: taskName },
  } = useDataFinder<TasksData>(taskInProgress?.task) ?? {
    data: { taskName: undefined },
  };
  const {
    data: { name: projectName },
  } = useDataFinder<ProjectsData>(taskInProgress?.project) ?? {
    data: { projectName: undefined },
  };
  const [showCheckboxComponent, setShowCheckboxComponent] = useState(false);

  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600}>
          Timer
        </DisplayText>
        <DisplayText weight={500}>
          {taskInProgress
            ? `currently working on ${taskName}`
            : "You Are now in Free Mode"}
        </DisplayText>
        {taskInProgress && (
          <DisplayText weight={500}>In Project {projectName}</DisplayText>
        )}
      </Head>
      <TimerClock showCheckboxes={showCheckboxComponent} />
      <TimerChecboxes
        showCheckboxes={showCheckboxComponent}
        setCheckboxes={setShowCheckboxComponent}
      />
    </PageWrap>
  );
};
export default Timer;
