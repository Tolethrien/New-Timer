import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
interface DropMenuButtonProps {
  children?: React.ReactNode;
  name: string;
  config?: {};
}
export const DropMenuButton: React.FC<DropMenuButtonProps> = ({
  children,
  name,
  config,
}) => {
  const [visible, setVisible] = useState(false);
  const myRef = useRef<null | HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    console.log(e);
    if (!myRef.current?.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Button ref={myRef} onClick={() => setVisible(!visible)} config={config}>
      <span>{name}</span>
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </Button>
  );
};
const Button = styled.div<{ config?: {} }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: black solid 1px;
  cursor: pointer;
  ${({ config }) => config}
`;
const OptionsBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 100;
`;

//========================================================
interface DropMenuOptionProps {
  children?: React.ReactNode;
  callback?: () => void;
  config?: {};
}
export const DropMenuOption: React.FC<DropMenuOptionProps> = ({
  callback,
  children,
  config,
}) => {
  return (
    <Option config={config} onClick={() => callback?.()}>
      {children}
    </Option>
  );
};
const Option = styled.div<{ config?: {} }>`
  background-color: grey;
  padding: 5px;
  ${({ config }) => config}
`;
