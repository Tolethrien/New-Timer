import styled from "styled-components";
import { useRef, useEffect, useState, useMemo } from "react";
import { TaskList, Clock } from "../../../utils/icons";
import { addProject } from "../../../../API/handleDocs";
import { randomKey } from "../../../utils/randomKey";
import DisplayIcon from "../../../custom/displayIcon";
import useTheme from "../../../hooks/useTheme";
import { colors } from "../../../../API/utils";
import { showFromOpacity } from "../../../styled/animations/showFromOpacity";
interface ProjectCardProps {
  referenceButton: React.MutableRefObject<HTMLButtonElement | null>;
  setTemplateProject: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  referenceButton,
  setTemplateProject,
}) => {
  const {
    getColor: {
      projectCardColorTone,
      projectCardSecondaryColorTone,
      textColorLight,
      projectCardProgressBarColorTone,
      projectCardProgressBarValueColor,
    },
  } = useTheme();
  const componentRef = useRef<HTMLDivElement>(null);
  const [projectName, setProjectName] = useState("");

  const icons = [TaskList, Clock, Clock];

  const handleClickOutside = (e: any) => {
    if (
      !componentRef.current?.contains(e.target) &&
      !referenceButton.current?.contains(e.target)
    ) {
      setTemplateProject(false);
    }
  };

  const projectColor = useMemo(() => {
    return Object.values(colors)[
      Math.floor(Math.random() * Object.values(colors).length)
    ];
  }, []);

  const addNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.length !== 0)
      addProject({ color: projectColor, name: projectName });
    setTemplateProject(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <ComponentBody
      hue={projectColor}
      ref={componentRef}
      bodyTone={projectCardColorTone}
    >
      <InfoConteiner>
        {icons.map((e) => (
          <InfoBox
            hue={projectColor}
            tone={projectCardSecondaryColorTone}
            key={randomKey()}
          >
            <DisplayIcon src={e} alt=""></DisplayIcon>
            <InfoBoxValue
              hue={projectColor}
              bodyColor={textColorLight}
            ></InfoBoxValue>
          </InfoBox>
        ))}
      </InfoConteiner>
      <NameForm onSubmit={(e) => addNewProject(e)}>
        <NameInput
          textColor={100}
          autoFocus={true}
          placeholder="Name of Project..."
          onChange={(e) => setProjectName(e.target.value)}
        ></NameInput>
      </NameForm>
      <ProgressBar
        value={50}
        max="100"
        hue={projectColor}
        tone={projectCardProgressBarColorTone}
        valueBarColor={projectCardProgressBarValueColor}
      ></ProgressBar>
      <FakeIcon pos={[0.5, 1]} bodyColor={textColorLight}></FakeIcon>
      {/* <FakeIcon pos={[2.1, 1]} bodyColor={textColorLight}></FakeIcon> */}
    </ComponentBody>
  );
};
export default ProjectCard;

const ComponentBody = styled.div<{ hue: number; bodyTone: string }>`
  display: flex;
  position: relative;
  width: 98%;
  background-color: ${({ bodyTone, hue }) =>
    `hsla(${hue}, 27%, ${bodyTone}, 1)`};
  border-radius: 10px;
  margin: 0.4rem 0;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
  animation: ${showFromOpacity} 0.5s normal forwards;
`;
const InfoConteiner = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number; tone: string }>`
  display: flex;
  background-color: ${({ tone, hue }) => `hsla(${hue}, 30%, ${tone}, 100%)`};
  border-radius: 5px;
  width: fit-content;
  align-items: center;
  padding: 0.2rem 0.3rem;
  margin: 0.3rem 0;
  color: hsla(0, 0%, 43%, 1);
  gap: 0.3rem;
`;

const InfoBoxValue = styled.div<{ hue: number; bodyColor: string }>`
  width: 3rem;
  height: 0.5rem;
  border-radius: 5px;
  background-color: ${({ bodyColor }) => bodyColor};
`;
const ProgressBar = styled.progress<{
  hue: number;
  tone: string;
  valueBarColor: string;
}>`
  position: absolute;
  bottom: 0.3rem;
  left: 27%;
  width: 68%;
  height: 0.5rem;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: ${({ hue, tone }) => `hsla(${hue}, 30%, ${tone}, 1)`};
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: ${({ valueBarColor }) => valueBarColor};
    border-radius: 5px;
  }
`;
const NameForm = styled.form`
  display: flex;
  align-items: center;
  width: 60%;
`;

const NameInput = styled.input<{ textColor: number }>`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  background: transparent;
  color: inherit;
  border: none;
  outline: none;
  ::placeholder {
    color: inherit;
  }
`;
const FakeIcon = styled.div<{ pos: [number, number]; bodyColor: string }>`
  position: absolute;
  top: ${({ pos }) => pos[0]}rem;
  right: ${({ pos }) => pos[1]}%;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
  background-color: ${({ bodyColor }) => bodyColor};
`;
