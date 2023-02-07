import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { Add } from "../utils/icons";
import ButtonAsIcon from "./buttonAsIcon";
interface UserDataModalProps {
  children: React.ReactNode;
  reference?: React.MutableRefObject<HTMLDialogElement | null>;
  onClose: () => void;
}
const UserDataModal: React.FC<UserDataModalProps> = ({
  children,
  reference,
  onClose,
}) => {
  const {
    getColor: { borderColor, itemCardColor },
  } = useTheme();
  return (
    <ComponentBody
      bodyColor={itemCardColor}
      borderColor={borderColor}
      ref={reference}
    >
      <ButtonAsIcon
        onClick={onClose}
        src={Add}
        extendedStyle={buttonAsCloseIcon}
      ></ButtonAsIcon>
      {children}
    </ComponentBody>
  );
};

export default UserDataModal;

const ComponentBody = styled.dialog<{ bodyColor: string; borderColor: string }>`
  color: inherit;
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(20px);
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 10px;
`;
const buttonAsCloseIcon = styled.button`
  transform: rotate(45deg);
  align-self: end;
  margin-bottom: -0.5rem;
  margin-left: auto;
`;
