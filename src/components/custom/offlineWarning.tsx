import { useEffect, useState } from "react";
import styled from "styled-components";
import useIsOnline from "../hooks/useIsOnline";
import DisplayText from "../styled/components/displayText";
import { Add } from "../utils/icons";
import ButtonAsIcon from "./buttonAsIcon";
interface OfflineWarningsProps {}
const OfflineWarnings: React.FC<OfflineWarningsProps> = (props) => {
  const isOnline = useIsOnline();

  const [warningShowed, setWarningShowed] = useState(isOnline);

  useEffect(() => {
    !isOnline && setWarningShowed(true);
    if (isOnline && warningShowed) setWarningShowed(false);
  }, [isOnline]);
  return (
    <ComponentBody isOnline={warningShowed}>
      <ButtonAsIcon
        extendedStyle={CloseButton}
        src={Add}
        onClick={() => {
          setWarningShowed(false);
        }}
      ></ButtonAsIcon>
      <DisplayText size={1.3} weight={600}>
        Lost internet connections
      </DisplayText>
      <p>
        you may still view the app but any changes will <b>NOT</b> be saved!
      </p>
      <p>may occur Errors</p>
    </ComponentBody>
  );
};
export default OfflineWarnings;
const ComponentBody = styled.div<{ isOnline: boolean }>`
  position: absolute;
  display: ${({ isOnline }) => (isOnline ? "flex" : "none")};
  flex-direction: column;
  max-width: 60%;
  width: fit-content;
  border: 1px solid black;
  backdrop-filter: blur(20px);
  top: 20%;
  left: -1%;
  gap: 0.5rem;
  z-index: 100;
  border-radius: 0 10px 10px 0;
  padding: 0.5rem;
`;
const CloseButton = styled.button`
  transform: rotate(45deg);
  align-self: flex-end;
  margin-bottom: -0.5rem;
`;
