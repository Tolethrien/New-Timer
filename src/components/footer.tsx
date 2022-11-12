import styled from "styled-components";
// import FirebaseApp from "./firebase";
import { NavLink } from "react-router-dom";
interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  let routes = ["home", "timer", "calendar", "data", "task", "option"];
  return (
    <Wrap>
      {/* {routes.map((route, index) => (
        <ButtonLink key={index}>{route[0]}</ButtonLink>
      ))} */}
      <ButtonLink as={NavLink} to={"./"}>
        H
      </ButtonLink>
      <ButtonLink as={NavLink} to={"./timer"}>
        T
      </ButtonLink>
      <ButtonLink as={NavLink} to={"./calendar"}>
        C
      </ButtonLink>
      <ButtonLink as={NavLink} to={"./data"}>
        D
      </ButtonLink>
      <ButtonLink as={NavLink} to={"./projects"}>
        P
      </ButtonLink>
      <ButtonLink as={NavLink} to={"./options"}>
        O
      </ButtonLink>
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
const ButtonLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: grey;
`;
