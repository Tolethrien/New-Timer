import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../components/providers/appProvider";
interface CalendarProps {}
interface StyleProps {}
const Calendar: React.FC<CalendarProps> = (props) => {
  const { currentUser } = useContext(appContext);
  if (!currentUser) return <Navigate to="/login" replace />;

  return <Wrap>Calendar</Wrap>;
};
export default Calendar;
const Wrap = styled.div<StyleProps>``;
