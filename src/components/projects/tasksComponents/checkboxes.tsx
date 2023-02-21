import styled from "styled-components";
import { useRef, useState } from "react";
import {
  checkboxesList,
  checkboxesType,
  TimeStamp,
} from "../../../API/getUserData";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import { Add } from "../../utils/icons";
import { randomKey } from "../../utils/randomKey";
import CheckBox from "./checkbox/checkbox";
import CheckboxTemplate from "./checkbox/checkboxTemplate";
import { useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
interface ChecboxesProps {
  checkboxes: checkboxesList;
  showComplete: boolean;
  displayOnly?: boolean;
  useID?: string;
}
const Checkboxes: React.FC<ChecboxesProps> = ({
  checkboxes,
  showComplete,
  displayOnly = false,
  useID,
}) => {
  const [isTemplateTask, setIsTemplateTask] = useState(false);
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const taskId = useParams().id!;
  const {
    getColor: { itemCardColor },
  } = useTheme();

  const sortCheckboxesByTimeOfCreate = (elA: TimeStamp, elB: TimeStamp) => {
    return elA?.seconds - elB?.seconds;
  };
  const sortCheckboxesByComplete = (
    elementA: [string, checkboxesType],
    elementB: [string, checkboxesType]
  ) => {
    return Number(elementA[1].value) - Number(elementB[1].value);
  };
  return (
    <ComponentBody>
      {checkboxes &&
        Object.entries(checkboxes)
          .filter((el) => !el[1].value)
          .sort((elA, elB) =>
            sortCheckboxesByTimeOfCreate(
              elA[1].createdAt as TimeStamp,
              elB[1].createdAt as TimeStamp
            )
          )
          .sort(sortCheckboxesByComplete)
          .map((checkbox) => (
            <CheckBox
              checkboxData={checkbox}
              key={randomKey()}
              taskId={useID ?? taskId}
            ></CheckBox>
          ))}
      {checkboxes &&
        showComplete &&
        Object.entries(checkboxes)
          .filter((el) => el[1].value)
          .sort((elA, elB) =>
            sortCheckboxesByTimeOfCreate(
              elA[1].createdAt as TimeStamp,
              elB[1].createdAt as TimeStamp
            )
          )
          .sort(sortCheckboxesByComplete)
          .map((checkbox) => (
            <CheckBox
              checkboxData={checkbox}
              key={randomKey()}
              taskId={useID ?? taskId}
            ></CheckBox>
          ))}
      {isTemplateTask && !displayOnly && (
        <CheckboxTemplate
          setIsTemplateTask={setIsTemplateTask}
          isTemplateTask={isTemplateTask}
          referenceButton={buttonNewRef}
        />
      )}
      {!displayOnly && (
        <ButtonWithIcon
          src={Add}
          alt=""
          onClick={() => setIsTemplateTask(true)}
          text="Add New"
          animation="invert"
          extendedStyle={extendedButton}
          extendedProps={{ extendedColor: itemCardColor }}
          reference={buttonNewRef}
        ></ButtonWithIcon>
      )}
    </ComponentBody>
  );
};
export default Checkboxes;
const ComponentBody = styled.div``;
const extendedButton = styled.button<{ extendedColor: string }>`
  background-color: ${({ extendedColor }) => extendedColor};
`;
