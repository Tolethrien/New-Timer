import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import ButtonAsIcon from "../styled/buttonAsIcon";
import useDisplayMode from "../hooks/useDisplayMode";
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
  const myRef = useRef<HTMLDivElement>(null);

  const {
    getColor: { iconColor },
  } = useDisplayMode();
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
      size={[1.4, 1.4]}
    >
      <OptionsBox visible={visible}>{children}</OptionsBox>
    </ComponentBody>
  );
};
const ComponentBody = styled.div<{
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
  iconColor: string;
}>`
  position: relative;
  display: flex;
  align-self: center;
  height: ${({ size }) => (size && `${size[0]}rem`) ?? "1rem"};
  width: ${({ size }) => (size && `${size[1]}rem`) ?? "1rem"};
  margin: ${({ margin }) => margin};
  background-color: transparent;
  border: none;
  cursor: pointer;
  :before {
    content: "";
    height: 100%;
    width: 100%;
    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-position: ${({ position }) => position ?? "center"};
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
}
export const DropMenuOption: React.FC<DropMenuOptionProps> = ({
  callback,
  children,
}) => {
  return <Option onClick={() => callback?.()}>{children}</Option>;
};
const Option = styled.div`
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 5px;
  padding: 5px;
`;
