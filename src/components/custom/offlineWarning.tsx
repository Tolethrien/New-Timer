import { useEffect, useState } from "react";
import styled from "styled-components";
import useIsOnline from "../hooks/useIsOnline";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/components/displayText";
import { Add } from "../utils/icons";
import { vibrate } from "../utils/vibrate";
import ButtonWithIcon from "./buttonWithIcon";
interface OfflineWarningsProps {}
const OfflineWarnings: React.FC<OfflineWarningsProps> = (props) => {
  const isOnline = useIsOnline();
  const {
    getColor: { itemCardColor, textError },
  } = useTheme();
  const [warningShowed, setWarningShowed] = useState(isOnline);
  const showWarning = () => {
    vibrate("long");
    setWarningShowed(true);
  };
  useEffect(() => {
    !isOnline && showWarning();
    if (isOnline && warningShowed) setWarningShowed(false);
  }, [isOnline]);
  return (
    <ComponentBody
      isOnline={warningShowed}
      componentColor={itemCardColor}
      borderColor={textError}
    >
      <DisplayText size={1.3} weight={600}>
        Lost internet connection
      </DisplayText>
      <DisplayText>
        Although App should store your changes locally and send them on server
        when internet connection is restored. It will <b>NOT</b> save them if
        you close or refresh app before that happens.
      </DisplayText>
      <DisplayText>
        Therefore it is <b>NOT</b> reccomended to using it at this state
      </DisplayText>
      <DisplayText>may occur Errors</DisplayText>
      <ButtonWithIcon
        alt=""
        src={Add}
        extendedStyle={CloseButton}
        extendedProps={{ textColor: textError }}
        noShadow
        text="I Understand!"
        onClick={() => {
          setWarningShowed(false);
        }}
      ></ButtonWithIcon>
    </ComponentBody>
  );
};
export default OfflineWarnings;
const ComponentBody = styled.div<{
  isOnline: boolean;
  componentColor: string;
  borderColor: string;
}>`
  position: absolute;
  display: ${({ isOnline }) => (isOnline ? "flex" : "none")};
  flex-direction: column;
  max-width: 60%;
  width: fit-content;
  backdrop-filter: blur(20px);
  background-color: ${({ componentColor }) => componentColor};
  top: 20%;
  left: -1%;
  gap: 0.5rem;
  z-index: 100;
  border-radius: 0 10px 10px 0;
  padding: 0.5rem;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.25);
  animation: MoveIn 0.5s ease-out forwards;
  @keyframes MoveIn {
    from {
      left: -50%;
    }
    to {
      left: -1%;
    }
  }
`;
const CloseButton = styled.button<{ textColor: string }>`
  align-self: flex-end;
  background-color: ${({ textColor }) => textColor};
  img {
    transform: rotate(45deg);
  }
`;
