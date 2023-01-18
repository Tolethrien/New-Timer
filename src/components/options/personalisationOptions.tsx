import { useContext } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import { appContext } from "../providers/appProvider";
import DisplayText from "../styled/displayText";
import { Logout, RoundSwap } from "../utils/icons";
import OptionBar from "./optionBar";
interface PersonalisationOptionsProps {}
const PersonalisationOptions: React.FC<PersonalisationOptionsProps> = (
  props
) => {
  const {
    displayMode: { setDisplayMode },
  } = useContext(appContext);
  const switchMode = () => {
    if (!localStorage.getItem("mode")) localStorage.setItem("mode", "light");
    if (localStorage.getItem("mode") === "light") {
      localStorage.setItem("mode", "dark");
      setDisplayMode(localStorage.getItem("mode") as string);
    } else if (localStorage.getItem("mode") === "dark") {
      localStorage.setItem("mode", "light");
      setDisplayMode(localStorage.getItem("mode") as string);
    }
  };
  return (
    <>
      <OptionBar>
        <DisplayText>Logout </DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text="Switch Mode"
          onClick={switchMode}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
