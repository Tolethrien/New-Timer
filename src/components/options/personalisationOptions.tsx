import { useContext } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/components/displayText";
import { RoundSwap } from "../utils/icons";
import OptionBar from "./optionBar";
const PersonalisationOptions: React.FC = () => {
  const { switchTheme } = useTheme();
  return (
    <>
      <OptionBar>
        <DisplayText>Logout</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text="Switch Mode"
          noShadow
          onClick={switchTheme}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
