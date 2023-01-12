import styled from "styled-components";
import { useRef, useEffect, useContext, useState } from "react";
import { TaskList, Clock } from "../../../utils/icons";
import { addProject } from "../../../../API/handleDocs";
import { randomKey } from "../../../utils/randomKey";
import { appContext } from "../../../providers/appProvider";
interface ProjectCardProps {
  referenceButton: React.MutableRefObject<HTMLButtonElement | null>;
  setTemplateProject: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  referenceButton,
  setTemplateProject,
}) => {
  const {
    text: { textColor },
  } = useContext(appContext);
  const componentRef = useRef<HTMLDivElement>(null);
  const [projectName, setProjectName] = useState("");

  const icons = [TaskList, Clock, Clock];
  const hue = 100;

  const handleClickOutside = (e: any) => {
    if (
      !componentRef.current?.contains(e.target) &&
      !referenceButton.current?.contains(e.target)
    ) {
      setTemplateProject(false);
    }
  };

  const addNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.length !== 0) addProject(projectName);
    setTemplateProject(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <ComponentBody hue={100} ref={componentRef}>
      <InfoConteiner>
        {icons.map((e) => (
          <InfoBox hue={hue} key={randomKey()}>
            <InfoBoxImg src={e}></InfoBoxImg>
            <InfoBoxValue hue={hue}></InfoBoxValue>
          </InfoBox>
        ))}
      </InfoConteiner>
      <NameForm onSubmit={(e) => addNewProject(e)}>
        <NameInput
          textColor={textColor}
          autoFocus={true}
          placeholder="Name of Project..."
          onChange={(e) => setProjectName(e.target.value)}
        ></NameInput>
      </NameForm>
      <ProgressBar value={50} max="100"></ProgressBar>
      <Icon pos={[0.5, 1]}></Icon>
      <Icon pos={[2.1, 1]}></Icon>
    </ComponentBody>
  );
};
export default ProjectCard;

const ComponentBody = styled.div<{ hue: number }>`
  display: flex;
  position: relative;
  width: 98%;
  background-color: ${({ hue }) => `hsla(${hue}, 27%, 90%, 1)`};
  border-radius: 10px;
  margin: 0.4rem 0;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const InfoConteiner = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number }>`
  display: flex;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  align-items: center;
  padding: 0.2rem 0.3rem;
  margin: 0.3rem 0;
  color: hsla(0, 0%, 43%, 1);
`;

const InfoBoxImg = styled.img`
  width: 1rem;
  margin-right: 5%;
  filter: invert(46%) sepia(9%) saturate(0%) hue-rotate(161deg) brightness(90%)
    contrast(97%);
`;
const InfoBoxValue = styled.div<{ hue: number }>`
  width: 3rem;
  height: 0.5rem;
  border-radius: 5px;
  background-color: ${({ hue }) => `hsla(${hue}, 0%, 55%, 100%)`};
`;
const ProgressBar = styled.progress`
  position: absolute;
  bottom: 0.3rem;
  left: 27%;
  width: 68%;
  height: 0.5rem;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: hsla(100, 30%, 75%, 1);
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: hsla(0, 0%, 31%, 1);
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
  color: ${({ textColor }) => `hsla(0, 0%, ${textColor}%, 1)`};
  border: none;
  outline: none;
`;
const Icon = styled.div<{ pos: [number, number] }>`
  position: absolute;
  top: ${({ pos }) => pos[0]}rem;
  right: ${({ pos }) => pos[1]}%;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
  background-color: hsla(100, 0%, 55%, 100%);
`;
