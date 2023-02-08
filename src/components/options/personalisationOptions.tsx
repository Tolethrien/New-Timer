import ButtonWithIcon from "../custom/buttonWithIcon";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/components/displayText";
import { RoundSwap } from "../utils/icons";
import OptionBar from "./optionBar";
const PersonalisationOptions: React.FC = () => {
  const { switchTheme, theme, coloredCategory, switchCategoryColor } =
    useTheme();
  return (
    <>
      <OptionBar>
        <DisplayText>Dark/Light Mode</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${theme} Mode`}
          noShadow
          onClick={switchTheme}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Colorful Categories</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${coloredCategory}`}
          noShadow
          onClick={switchCategoryColor}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
