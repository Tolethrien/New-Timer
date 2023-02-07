import styled, { StyledComponent } from "styled-components";
import { useState, useEffect, useRef } from "react";
import useTheme from "../hooks/useTheme";
interface DropMenuButtonProps {
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
  src: string;
  alt: string;
}
export const DropMenuButton: React.FC<DropMenuButtonProps> = ({
  children,
  src,
  extendedStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  const {
    getColor: { iconColor },
  } = useTheme();

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
    <ComponentBody
      iconColor={iconColor}
      src={src}
      onClick={() => setVisible((prev) => !prev)}
      ref={myRef}
      as={extendedStyle}
    >
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </ComponentBody>
  );
};
const ComponentBody = styled.div<{
  src: string;
  iconColor: string;
}>`
  position: relative;
  display: flex;
  align-self: center;
  height: 1.4rem;
  width: 1.4rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  :before {
    content: "";
    height: 100%;
    width: 100%;
    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: ${({ iconColor }) => iconColor};
  }
`;
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
  extendedStyle?: StyledComponent<"div", any, {}, never>;
}
export const DropMenuOption: React.FC<DropMenuOptionProps> = ({
  callback,
  children,
  extendedStyle,
}) => {
  const {
    getColor: { dropMenuOptionColor, dropMenuOptionBorderColor },
  } = useTheme();
  return (
    <Option
      onClick={() => callback?.()}
      dropMenuOptionBorderColor={dropMenuOptionBorderColor}
      dropMenuOptionColor={dropMenuOptionColor}
      as={extendedStyle}
    >
      {children}
    </Option>
  );
};
const Option = styled.div<{
  dropMenuOptionBorderColor: string;
  dropMenuOptionColor: string;
}>`
  border: ${({ dropMenuOptionBorderColor }) =>
    `1px solid ${dropMenuOptionBorderColor}`};
  background-color: ${({ dropMenuOptionColor }) => dropMenuOptionColor};
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 1.3rem;
`;
