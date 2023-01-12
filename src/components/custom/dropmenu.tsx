import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import { ButtonAsIcon } from "../styled/buttonAsIcon";
import { appContext } from "../providers/appProvider";
interface DropMenuButtonProps {
  children?: React.ReactNode;
  config?: {};
  src: string;
  alt: string;
}
export const DropMenuButton: React.FC<DropMenuButtonProps> = ({
  children,
  src,
}) => {
  const [visible, setVisible] = useState(false);
  const myRef = useRef<HTMLButtonElement>(null);

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
    <ButtonAsIcon
      src={src}
      onClick={() => setVisible((prev) => !prev)}
      ref={myRef}
      size={[1.4, 1.4]}
    >
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </ButtonAsIcon>
  );
};
const OptionsBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  right: -50%;
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
  const {
    text: { textColor },
  } = useContext(appContext);
  return (
    <Option config={config} onClick={() => callback?.()} hue={textColor}>
      {children}
    </Option>
  );
};
const Option = styled.div<{ config?: {}; hue: number }>`
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 5px;
  color: ${({ hue }) => `hsla(0, 0%, ${hue}%, 1)`};
  padding: 5px;
  ${({ config }) => config}
`;
