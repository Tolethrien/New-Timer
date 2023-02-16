import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Timer, Projects, Options } from "../utils/icons";
import { useEffect, useState } from "react";
import { vibrate } from "../utils/vibrate";
import useTheme from "../hooks/useTheme";

const Footer: React.FC = () => {
  type WindowsTypes = "timer" | "projects" | "options";
  const [currentWindow, setCurrentWindow] = useState<WindowsTypes>("projects");
  const {
    getColor: {
      footerActiveIconColor,
      footerInActiveIconColor,
      footerBackgroundColor,
    },
  } = useTheme();

  const navigate = useNavigate();

  const route = window.location.pathname.slice(1);

  const changeRoute = (value: WindowsTypes) => {
    if (value !== currentWindow) {
      vibrate("short");
      setCurrentWindow(value);
      navigate(`/${value}`);
    }
  };

  useEffect(() => {
    if (route === "timer" || route === "options") setCurrentWindow(route);
    else if (route.includes("projects")) setCurrentWindow("projects");
    // console.log(route.includes("projects"), currentWindow, route);
  }, [route]);

  return (
    <ComponentBody footerBackgroundColor={footerBackgroundColor}>
      <ButtonLink
        bodycolor={
          currentWindow === "timer"
            ? footerActiveIconColor
            : footerInActiveIconColor
        }
        onClick={() => changeRoute("timer")}
      >
        <ButtonImg src={Timer} alt={`Timer button`}></ButtonImg>
      </ButtonLink>
      <ButtonLink
        bodycolor={
          currentWindow === "projects"
            ? footerActiveIconColor
            : footerInActiveIconColor
        }
        onClick={() => changeRoute("projects")}
      >
        <ButtonImg src={Projects} alt={`Projects button`}></ButtonImg>
      </ButtonLink>
      <ButtonLink
        bodycolor={
          currentWindow === "options"
            ? footerActiveIconColor
            : footerInActiveIconColor
        }
        onClick={() => changeRoute("options")}
      >
        <ButtonImg src={Options} alt={`options button`}></ButtonImg>
      </ButtonLink>
    </ComponentBody>
  );
};
export default Footer;

export const ComponentBody = styled.footer<{ footerBackgroundColor: string }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.6rem 0;
  width: 100%;
  border-radius: 7px 7px 0 0;
  background-color: ${({ footerBackgroundColor }) => footerBackgroundColor};
  backdrop-filter: blur(10px);
`;
const ButtonLink = styled.button<{ bodycolor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  background-color: ${({ bodycolor }) => bodycolor};
  border-radius: 10px;
  transition: 0.3s;
  border: none;
  cursor: pointer;
`;
const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
`;
