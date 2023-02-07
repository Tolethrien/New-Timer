import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

import { Timer, Projects, Options } from "../utils/icons";
import { useContext, useState, useEffect } from "react";
import { vibrate } from "../utils/vibrate";
import { clockContext } from "../providers/clockProvider";
import { authContext } from "../providers/authProvider";
import useTheme from "../hooks/useTheme";
interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { currentUser } = useContext(authContext);

  const {
    getColor: { appColorPrimary },
  } = useTheme();
  const { barProgress, taskInProgress, timeLeft } = useContext(clockContext);
  const navigate = useNavigate();
  const linkData = {
    timer: {
      id: 1,
      name: "Timer",
      link: "./timer",
      icon: Timer,
    },
    Projects: { id: 4, name: "Projects", link: "./projects", icon: Projects },
    Options: { id: 5, name: "Options", link: "./options", icon: Options },
  };
  const findUrl = Object.values(linkData).find((e) =>
    e.link.includes(window.location.pathname)
  );

  useEffect(() => {
    // findUrl?.id !== currentWindow.id && currentWindow.set(findUrl!.id);
  }, []);
  return (
    <Wrap userLogedIn={Boolean(currentUser)}>
      <ButtonLink
        as={NavLink}
        to={`./timer/*`}
        bodycolor={appColorPrimary}
        onClick={() => vibrate("short")}
        color={"#6e6e6ea5"}
      >
        <ButtonImg src={Timer} alt={`Timer button`}></ButtonImg>
      </ButtonLink>
      <ButtonLink
        as={NavLink}
        to={"./projects"}
        bodycolor={appColorPrimary}
        onClick={() => vibrate("short")}
        color={"#6e6e6ea5"}
      >
        <ButtonImg src={Projects} alt={`Projects button`}></ButtonImg>
      </ButtonLink>
      <ButtonLink
        as={NavLink}
        to={"./options"}
        bodycolor={appColorPrimary}
        onClick={() => vibrate("short")}
        color={"#6e6e6ea5"}
      >
        <ButtonImg src={Options} alt={`options button`}></ButtonImg>
      </ButtonLink>
    </Wrap>
  );
};
export default Footer;
export const Wrap = styled.footer<{ userLogedIn: boolean }>`
  /* display: ${({ userLogedIn }) => (userLogedIn ? "flex" : "none")}; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  border-radius: 7px 7px 0 0;
  background-color: hsla(360, 90%, 14%, 0.19);
  backdrop-filter: blur(10px);
`;
const ButtonLink = styled.div<{ bodycolor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  transition: 0.5s;

  background-color: ${({ bodycolor }) => bodycolor};
`;
const ButtonImg = styled.img`
  width: 70%;
  height: 70%;
`;
