import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { appContext } from "../../providers/appProvider";
import { Collapse } from "../../utils/icons";
const Category: React.FC<{
  name: string;
  hue: number;
  children?: React.ReactNode;
}> = ({ name, hue, children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const divChildrenRef = useRef<HTMLDivElement>(null);
  const {
    text: { textColor },
  } = useContext(appContext);
  useEffect(() => {
    divChildrenRef?.current &&
      divChildrenRef.current.children.length === 0 &&
      setIsEmpty(true);
  }, [divChildrenRef.current]);
  return (
    <ComponentBody hue={hue}>
      <TopBar hue={hue}>
        <TopBarName hue={textColor}>{name}</TopBarName>
        <CollapseIcon
          isCollapsed={isCollapsed}
          src={Collapse}
          alt="collaps Category"
          onClick={() => setIsCollapsed((prev) => !prev)}
        ></CollapseIcon>
      </TopBar>
      {!isCollapsed && !isEmpty && (
        <TaskWrapper ref={divChildrenRef}>{children}</TaskWrapper>
      )}
    </ComponentBody>
  );
};
export default Category;

const ComponentBody = styled.div<{ hue: number }>`
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
    background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
    border-radius: 0 0 5px 0;
  }
`;

const TaskWrapper = styled.div`
  width: 94%;
  z-index: 2;
  margin-top: 1.9rem;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 0;
  height: 1.75rem;
  width: 30%;
  background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
  border-radius: 0 5px 5px 0;
`;
const TopBarName = styled.p<{ hue: number }>`
  color: ${({ hue }) => `hsla(0, 0%, ${hue}%, 1)`};
  font-weight: 500;
  padding-left: 5%;
`;
