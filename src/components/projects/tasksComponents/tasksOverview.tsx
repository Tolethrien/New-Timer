import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useParams, Outlet } from "react-router-dom";
import { RouteData, RoutesChange } from "../../../pages/projects";
import FindData from "../../hooks/findData";
import { TasksData } from "../../../API/getUserData";

interface TasksOverviewProps {
  changeRoute: (route: RoutesChange) => void;
  renderRoute: RouteData;
}
interface StyleProps {}
const TaskOverview: React.FC<TasksOverviewProps> = ({
  renderRoute,
  changeRoute,
}) => {
  const project = FindData(renderRoute) as TasksData;

  return (
    <Wrap>
      TasksOverview
      <p>{project.id}</p>
      <button onClick={() => changeRoute("back")}>back</button>
    </Wrap>
  );
};
export default TaskOverview;
const Wrap = styled.div<StyleProps>``;
const Butt = styled.div<StyleProps>``;
