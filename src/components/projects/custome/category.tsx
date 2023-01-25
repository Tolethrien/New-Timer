import { useContext, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { appContext } from "../../providers/appProvider";
import { Collapse } from "../../utils/icons";
const Category: React.FC<{
  name: string;
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
}> = ({ name, children, extendedStyle }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const divChildrenRef = useRef<HTMLDivElement>(null);
  const {
    displayMode: { displayMode },
  } = useContext(appContext);

  return (
    <ComponentBody displayMode={displayMode} as={extendedStyle}>
      <TopBar displayMode={displayMode}>
        <TopBarName>{name}</TopBarName>
        <CollapseIcon
          isCollapsed={isCollapsed}
          displayMode={displayMode}
          src={Collapse}
          alt="collaps Category"
          onClick={() => setIsCollapsed((prev) => !prev)}
        ></CollapseIcon>
      </TopBar>
      {!isCollapsed && (
        <TaskWrapper ref={divChildrenRef}>{children}</TaskWrapper>
      )}
    </ComponentBody>
  );
};
export default Category;

const ComponentBody = styled.div<{ displayMode: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;

  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    top: 0;
    height: calc(100% + 1rem);
    width: 5%;
    transition: 0.5s;

    background-color: ${({ displayMode }) =>
      `hsla(245, 84%, ${displayMode === "light" ? 85 : 15}%, 1)`};
    border-radius: 0 0 5px 0;
  }
`;

const TaskWrapper = styled.div`
  width: 94%;
  z-index: 2;
  margin-top: 1.9rem;
`;
const CollapseIcon = styled.img<{ isCollapsed: boolean; displayMode: string }>`
  width: 0.8rem;
  height: 0.8rem;
  transition: 0.5s;
  cursor: pointer;
  transform: ${({ isCollapsed }) =>
    `rotate(${isCollapsed ? "0deg" : "180deg"})`};
  ${({ displayMode }) =>
    displayMode === "light"
      ? `
  filter: brightness(0) invert(0.3);
  `
      : `
  filter: brightness(0) invert(0.7);
      `};
`;
const TopBar = styled.div<{ displayMode: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 0;
  height: 1.75rem;
  min-width: 6rem;
  padding-inline: 2%;
  gap: 0.5rem;
  transition: 0.5s;
  background-color: ${({ displayMode }) =>
    `hsla(245, 84%, ${displayMode === "light" ? 85 : 15}%, 1)`};
  border-radius: 0 5px 5px 0;
`;
const TopBarName = styled.p`
  font-weight: 500;
`;
