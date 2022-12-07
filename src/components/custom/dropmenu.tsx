import styled from "styled-components";
import { useState } from "react";
interface DropMenuButtonProps {
  children?: React.ReactNode;
  name: string;
}
export const DropMenuButton: React.FC<DropMenuButtonProps> = ({
  children,
  name,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Button onClick={() => setVisible(!visible)}>
      <span>{name}</span>
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </Button>
  );
};
const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  background-color: blue;
  cursor: pointer;
`;
const OptionsBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  left: 0;
  top: 100%;
`;
//========================================================
interface DropMenuOptionProps {
  children?: React.ReactNode;
  callback?: () => void;
}
export const DropMenuOption: React.FC<DropMenuOptionProps> = ({
  callback,
  children,
}) => {
  return <Option onClick={() => callback?.()}>{children}</Option>;
};
const Option = styled.div``;
