import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../styled/components/displayText";
import { Trash } from "../utils/icons";
import OptionBar from "./optionBar";

const DangerZone: React.FC = () => {
  const demo = () => {
    alert("danger zone restricted in demo version");
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
          onClick={demo}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Permanently delete account </DisplayText>
        <ButtonWithIcon
          src={Trash}
          alt=""
          text="delete"
          noShadow
          onClick={demo}
        ></ButtonWithIcon>
      </OptionBar>
    </ComponentBody>
  );
};
export default DangerZone;
const ComponentBody = styled.div<{}>``;
