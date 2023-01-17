import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../components/providers/appProvider";
interface HomeProps {}
interface StyleProps {}
const Dashboard: React.FC<HomeProps> = (props) => {
  const { currentUser } = useContext(appContext);
  if (!currentUser) return <Navigate to="/login" replace />;

  return <Wrap>Home wrr</Wrap>;
};
export default Dashboard;
const Wrap = styled.div<StyleProps>``;
