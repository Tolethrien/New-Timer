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
        <DisplayText>Dark/Light mode</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${theme} mode`}
          noShadow
          animation="inset"
          onClick={() => dispatch({ type: "switchThemeColor" })}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Colorful categories</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${coloredCategory}`}
          noShadow
          animation="inset"
          onClick={() => dispatch({ type: "switchCategoryColor" })}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Colorful projects header</DisplayText>
        <ButtonWithIcon
          src={RoundSwap}
          alt=""
          text={`${coloredHeaders}`}
          noShadow
          animation="inset"
          onClick={() => dispatch({ type: "switchHeaderColor" })}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default PersonalisationOptions;
