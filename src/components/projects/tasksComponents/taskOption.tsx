import styled, { StyledComponent } from "styled-components";
import { useState } from "react";
import { RoundSwap } from "../../utils/icons";
import TimeField from "../../hooks/timefield";
interface TaskOptionProps {
  type: "TextData" | "Toggle" | "Cycle";
  optionName: string;
  setOption?: React.Dispatch<React.SetStateAction<boolean>>;
  showOption?: boolean | string;
  callback?: () => void;
}

interface StyleProps {}
const TaskOption: React.FC<TaskOptionProps> = ({
  type,
  optionName,
  setOption,
  showOption,
  callback,
}) => {
  return (
    <Wrap>
      <Text size={1.2} weight={500} margin="1% 5%">
        {optionName}
      </Text>
      {type === "Toggle" && (
        <Toggle
          onClick={() => setOption!((prev) => !prev)}
          active={showOption! as boolean}
        ></Toggle>
      )}
      {type === "TextData" && <TextData>{/* <TimeField /> */}</TextData>}
      {type === "Cycle" && (
        <TaskStatus>
          <Text size={1} padding="0 15% 0 0 ">
            {showOption}
          </Text>
          <ButtonImg src={RoundSwap} onClick={() => callback!()}></ButtonImg>
        </TaskStatus>
      )}
    </Wrap>
  );
};
export default TaskOption;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  color: black;
  /* padding: 5px 0; */
  /* margin-top: 0.5%; */
  margin-bottom: 0.1rem;
  background-color: hsla(169, 77%, 88%, 1);
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px hsla(0, 0%, 0%, 0.25));
`;
const TextData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-right: 5%;
  /* width: 100%; */
  padding: 1% 5%;
  border-radius: 5px;
  background-color: hsla(0, 0%, 85%, 0.4);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const Toggle = styled.div<{ active: boolean }>`
  position: relative;
  width: 20%;
  height: 1rem;
  margin-right: 5%;
  border-radius: 5px;
  background-color: hsla(0, 0%, 85%, 0.4);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
  :after {
    content: "";
    position: absolute;
    top: -0.25rem;
    width: 50%;
    height: 1.4rem;
    background-color: hsla(0, 5%, 40%, 1);
    box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.25);
    border-radius: 5px;
    transition: 0.5s;
    ${({ active }) =>
      active ? `left:5%;` : `left:95%; transform:translate(-100%);`}
  }
`;
const Text = styled.p<{
  size: number;
  weight?: number;
  margin?: string;
  padding?: string;
}>`
  font-style: normal;
  white-space: nowrap;
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: black;
  span {
    font-weight: 900;
  }
`;
const TaskStatus = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 50%;
`;
