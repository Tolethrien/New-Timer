import ButtonWithIcon from "../custom/buttonWithIcon";
import useTheme from "../hooks/useTheme";
import DisplayText from "../styled/components/displayText";
import { RoundSwap } from "../utils/icons";
import OptionBar from "./optionBar";
const PersonalisationOptions: React.FC = () => {
  const { dispatch, theme, coloredCategory, coloredHeaders } = useTheme();
  return (
    <>
      <OptionBar>
        <DisplayText>Dark/Light Mode</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${theme} Mode`}
          noShadow
          onClick={() => dispatch({ type: "switchThemeColor" })}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Colorful Categories</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${coloredCategory}`}
          noShadow
          onClick={() => dispatch({ type: "switchCategoryColor" })}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Colorful Headers</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${coloredHeaders}`}
          noShadow
          onClick={() => dispatch({ type: "switchHeaderColor" })}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
