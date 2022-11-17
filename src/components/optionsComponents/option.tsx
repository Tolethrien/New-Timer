import styled from "styled-components";
import { useContext } from "react";
import { appContext } from "../../global/provider";
interface OptionProps {
  children: React.ReactNode;
  optionName: string;
}

const Option: React.FC<OptionProps> = ({ children, optionName }) => {
  const {
    secondary: { secondaryColor },
  } = useContext(appContext);
  return (
    <Wrap onClick={() => console.log("sss")} color={secondaryColor}>
      <Name>{optionName}</Name>
      {children}
    </Wrap>
  );
};
export default Option;
const Wrap = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  width: 95%;
  background-color: ${({ color }) => color};
  font-size: 1.5em;
  padding: 5% 0;
  margin: 1px 0;
  border-radius: 5px;
`;
const Name = styled.div`
  padding-left: 10px;
`;
