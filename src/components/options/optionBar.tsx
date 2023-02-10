import styled from "styled-components";
import useTheme from "../hooks/useTheme";
interface OptionBarProps {
  children: React.ReactNode;
}
const OptionBar: React.FC<OptionBarProps> = ({ children }) => {
  const {
    getColor: { itemCardColor, staticShadowColor },
  } = useTheme();

  return (
    <ComponentBody bodyColor={itemCardColor} shadowColor={staticShadowColor}>
      {children}
    </ComponentBody>
  );
};
export default OptionBar;
const ComponentBody = styled.div<{ bodyColor: string; shadowColor: string }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.7rem;
  margin-bottom: 0.1rem;
  background-color: ${({ bodyColor }) => bodyColor};
  border-radius: 5px;
  backdrop-filter: blur(20px);
  box-shadow: ${({ shadowColor }) => `2px 2px 4px 1px ${shadowColor}`};
`;
