import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../providers/appProvider";
interface OptionBarProps {
  children: React.ReactNode;
}
const OptionBar: React.FC<OptionBarProps> = ({ children }) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);

  return <ComponentBody displayMode={displayMode}>{children}</ComponentBody>;
};
export default OptionBar;
const ComponentBody = styled.div<{ displayMode: string }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.7rem;
  margin-bottom: 0.1rem;
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  border-radius: 5px;
  backdrop-filter: blur(20px);
  box-shadow: 2px 2px 4px 1px hsla(0, 0%, 0%, 0.25);
`;
