import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Dashboard from "../Icons/Dashboard.svg";
import Timer from "../Icons/Timer.svg";
import Calendar from "../Icons/Calendar.svg";
import Data from "../Icons/Data.svg";
import Projects from "../Icons/Projects.svg";
import Options from "../Icons/Options.svg";
import { useContext, useState } from "react";
import { appContext } from "../global/provider";
interface FooterProps {}
interface styleProps {
  color: string;
}
const Footer: React.FC<FooterProps> = () => {
  const {
    primary: { primaryColor },
    secondary: { secondaryColor },
  } = useContext(appContext);
  const linkData = {
    dashboard: { id: 0, name: "Dashboard", link: "./", icon: Dashboard },
    timer: { id: 1, name: "Timer", link: "./timer", icon: Timer },
    Calendar: { id: 2, name: "Calendar", link: "./calendar", icon: Calendar },
    Data: { id: 3, name: "Data", link: "./data", icon: Data },
    Projects: { id: 4, name: "Projects", link: "./projects", icon: Projects },
    Options: { id: 5, name: "Options", link: "./options", icon: Options },
  };
  const findUrl = Object.values(linkData).find((e) =>
    e.link.includes(window.location.pathname)
  );
  const [currentWindow, setCurrentWindow] = useState<number | undefined>(
    findUrl ? findUrl.id : undefined
  );
  const buzzTime: number = 50;
  return (
    <Wrap>
      {Object.values(linkData).map((key) => (
        <ButtonLink
          as={NavLink}
          to={key.link}
          key={key.id}
          onClick={() => (
            setCurrentWindow(key.id), navigator.vibrate(buzzTime)
          )}
          color={currentWindow === key.id ? primaryColor : secondaryColor}
        >
          <ButtonImg src={key.icon} alt={`${key.name} button`}></ButtonImg>
        </ButtonLink>
      ))}
    </Wrap>
  );
};
export default Footer;
const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  border-radius: 7px 7px 0 0;
  background-color: #430303a5;
`;
const ButtonLink = styled.div<styleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: ${({ color }) => color};
`;
const ButtonImg = styled.img`
  width: 70%;
  height: 70%;
  -webkit-tap-highlight-color: transparent;
`;
