import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
interface DropMenuButtonProps {
  children?: React.ReactNode;
  config?: {};
  src: string;
  alt: string;
}
export const DropMenuButton: React.FC<DropMenuButtonProps> = ({
  children,
  config,
  src,
  alt,
}) => {
  const [visible, setVisible] = useState(false);
  const myRef = useRef<null | HTMLImageElement>(null);
  const handleClickOutside = (e: any) => {
    if (!myRef.current?.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    visible && document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Button ref={myRef} onClick={() => setVisible(!visible)} config={config}>
      <img src={src} alt={alt}></img>
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </Button>
  );
};
const Button = styled.div<{ config?: {} }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ config }) => config}
`;
const OptionsBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  right: 0;
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
