import styled from "styled-components";
import Glass from "../components/styled/glass";
import Option from "../components/options/option";
import { logout } from "../API/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../components/providers/appProvider";
interface OptionsProps {}
interface StyleProps {}
const Options: React.FC<OptionsProps> = (props) => {
  const {
    currentUser,
    displayMode: { setDisplayMode },
  } = useContext(appContext);
  const navigate = useNavigate();
  const signout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  const switchMode = () => {
    if (!localStorage.getItem("mode")) localStorage.setItem("mode", "light");
    if (localStorage.getItem("mode") === "light") {
      localStorage.setItem("mode", "dark");
      setDisplayMode(localStorage.getItem("mode") as string);
    } else if (localStorage.getItem("mode") === "dark") {
      localStorage.setItem("mode", "light");
      setDisplayMode(localStorage.getItem("mode") as string);
    }
  };
  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <Wrap>
      <Glass size={"inline"}>
        <Name>Settings</Name>
        <button onClick={() => signout()}>wyloguj</button>
        <button onClick={() => switchMode()}>switch mode</button>
      </Glass>
    </Wrap>
  );
};
export default Options;
const Wrap = styled.div<StyleProps>`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;
const Name = styled.h3<StyleProps>`
  padding-top: 2%;
  font-size: 1.3em;
`;
const Button = styled.div<StyleProps>`
  width: 10%;
  height: 30%;
  color: white;
`;
