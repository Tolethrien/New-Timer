import styled from "styled-components";
import LineDevider from "../components/styled/lineDevider";
import Glass from "../components/styled/glass";
import Option from "../components/options/option";
interface OptionsProps {}
interface StyleProps {}
const Options: React.FC<OptionsProps> = (props) => {
  return (
    <Wrap>
      <Glass size={"inline"}>
        <Name>Settings</Name>
        <LineDevider width={80} margin={1} thickness={3} />
        <Option optionName={"string"}>
          <Button>s</Button>
        </Option>
      </Glass>
    </Wrap>
  );
};
export default Options;
const Wrap = styled.div<StyleProps>`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;
const Name = styled.h3<StyleProps>`
  padding-top: 2%;
  font-size: 1.3em;
`;
const Button = styled.div<StyleProps>`
  width: 10%;
  height: 30%;
  color: white;
`;
