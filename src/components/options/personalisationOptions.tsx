import { useContext } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/displayText";
import { Logout, RoundSwap } from "../utils/icons";
import OptionBar from "./optionBar";
interface PersonalisationOptionsProps {}
const PersonalisationOptions: React.FC<PersonalisationOptionsProps> = (
  props
) => {
  const { switchDisplayMode } = useTheme();
  return (
    <>
      <OptionBar>
        <DisplayText>Logout </DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text="Switch Mode"
          noShadow
          onClick={switchDisplayMode}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
