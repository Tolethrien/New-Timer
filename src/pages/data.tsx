import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../components/providers/appProvider";
interface DataProps {}
interface StyleProps {}
const Data: React.FC<DataProps> = (props) => {
  const { currentUser } = useContext(appContext);
  if (!currentUser) return <Navigate to="/login" replace />;

  return <Wrap>Data</Wrap>;
};
export default Data;
const Wrap = styled.div<StyleProps>``;
