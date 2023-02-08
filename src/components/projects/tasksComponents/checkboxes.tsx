import styled from "styled-components";
import { useRef, useState } from "react";
import { checkboxes } from "../../../API/getUserData";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import { Add } from "../../utils/icons";
import { randomKey } from "../../utils/randomKey";
import CheckBox from "./checkbox/checkbox";
import CheckboxTemplate from "./checkbox/checkboxTemplate";
import { useParams } from "react-router-dom";
interface ChecboxesProps {
  checkboxes: checkboxes;
  displayOnly?: boolean;
  useID?: string;
}
const Checkboxes: React.FC<ChecboxesProps> = ({
  checkboxes,
  displayOnly = false,
  useID,
}) => {
  const [templateTask, setTemplateTask] = useState(false);
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const taskId = useParams().id!;

  const sortCheckboxesByTimeOfCreate = (
    elementA: [string, { createdAt: number }],
    elementB: [string, { createdAt: number }]
  ) => {
    return elementA[1]!.createdAt - elementB[1]!.createdAt;
  };
  const sortCheckboxesByComplete = (
    elementA: [string, { value: boolean }],
    elementB: [string, { value: boolean }]
  ) => {
    return Number(elementA[1].value) - Number(elementB[1].value);
  };
  return (
    <ComponentBody>
      {checkboxes &&
        Object.entries(checkboxes)
          .sort(sortCheckboxesByTimeOfCreate)
          .sort(sortCheckboxesByComplete)
          .map((checkbox) => (
            <CheckBox
              checkboxData={checkbox}
              key={randomKey()}
              taskId={useID ?? taskId}
            ></CheckBox>
          ))}
      {templateTask && !displayOnly && (
        <CheckboxTemplate
          setTemplateTask={setTemplateTask}
          referenceButton={buttonNewRef}
        />
      )}
      {!displayOnly && (
        <ButtonWithIcon
          src={Add}
          alt=""
          onClick={() => setTemplateTask(true)}
          text="Add New"
          reference={buttonNewRef}
        ></ButtonWithIcon>
      )}
    </ComponentBody>
  );
};
export default Checkboxes;
const ComponentBody = styled.div``;
