import { useState } from "react";
import styled from "styled-components";
import { Collapse } from "../../utils/icons";
const Category: React.FC<{
  name: string;
  hue: number;
  children?: React.ReactNode;
}> = ({ name, hue, children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <CategoryType name={name} hue={hue}>
      <TopBar hue={hue}>
        <TopBarName>{name}</TopBarName>
        <CollapseIcon
          isCollapsed={isCollapsed}
          src={Collapse}
          alt="collaps Category"
          onClick={() => setIsCollapsed((prev) => !prev)}
        ></CollapseIcon>
      </TopBar>
      {!isCollapsed && <TaskWrapper>{children}</TaskWrapper>}
    </CategoryType>
  );
};
export default Category;

const CategoryType = styled.div<{ name: string; hue: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: 1%;
  position: relative;
  height: fit-content;
  margin-bottom: 2rem;

  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    top: 0;
    height: calc(100% + 1rem);
    width: 5%;
    background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
    border-radius: 5px;
  }
`;

const TaskWrapper = styled.div`
  width: 94%;
  z-index: 2;
  margin-top: 1.75rem;
`;
const CollapseIcon = styled.img<{ isCollapsed: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  padding: 0 5%;
  transition: 0.5s;
  cursor: pointer;
  transform: ${({ isCollapsed }) =>
    `rotate(${isCollapsed ? "0deg" : "180deg"})`};
`;
const TopBar = styled.div<{ hue: number }>`
  position: absolute;
  color: black;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 0;
  height: 1.75rem;
  width: 30%;
  background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
  border-radius: 5px;
`;
const TopBarName = styled.p`
  padding-left: 5%;
`;
