import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../custom/displayText";
import { Trash } from "../utils/icons";
import OptionBar from "./optionBar";
interface DangerZoneProps {}
const DangerZone: React.FC<DangerZoneProps> = (props) => {
  const temp = () => {
    alert("danger zone temporary alert");
  };
  return (
    <ComponentBody>
      <OptionBar>
        <DisplayText>Delete all user data </DisplayText>
        <ButtonWithIcon
          src={Trash}
          alt=""
          text="delete"
          noShadow
          onClick={temp}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Permanently delete account </DisplayText>
        <ButtonWithIcon
          src={Trash}
          alt=""
          text="delete"
          noShadow
          onClick={temp}
        ></ButtonWithIcon>
      </OptionBar>
    </ComponentBody>
  );
};
export default DangerZone;
const ComponentBody = styled.div<{}>``;
