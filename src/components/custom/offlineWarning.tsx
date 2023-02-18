import { useEffect, useState } from "react";
import styled from "styled-components";
import useIsOnline from "../hooks/useIsOnline";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/components/displayText";
import { Add } from "../utils/icons";
import ButtonAsIcon from "./buttonAsIcon";
import ButtonWithIcon from "./buttonWithIcon";
interface OfflineWarningsProps {}
const OfflineWarnings: React.FC<OfflineWarningsProps> = (props) => {
  const isOnline = useIsOnline();
  const {
    getColor: { itemCardColor, textError },
  } = useTheme();
  const [warningShowed, setWarningShowed] = useState(isOnline);

  useEffect(() => {
    !isOnline && setWarningShowed(true);
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
        you may still view the app but any changes will <b>NOT</b> be saved!
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
  /* border: 1px solid ${({ borderColor }) => borderColor}; */
  backdrop-filter: blur(20px);
  background-color: ${({ componentColor }) => componentColor};
  top: 30%;
  left: -1%;
  gap: 0.5rem;
  z-index: 100;
  border-radius: 0 10px 10px 0;
  padding: 0.5rem;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.25);
`;
const CloseButton = styled.button<{ textColor: string }>`
  align-self: flex-end;
  background-color: ${({ textColor }) => textColor};
  img {
    transform: rotate(45deg);
  }
`;
