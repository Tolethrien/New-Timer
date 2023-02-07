import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../styled/components/displayText";
import { Add } from "../utils/icons";
interface NoProjectsDisplayProps {
  isTemplateOpen: boolean;
}
const NoProjectsDisplay: React.FC<NoProjectsDisplayProps> = ({
  isTemplateOpen,
}) => {
  return (
    <ComponentBody>
      {!isTemplateOpen ? (
        <>
          <DisplayText size={2} weight={600}>
            no projects
          </DisplayText>
          <DisplayText weight={500}>
            consider adding some projects to your list
          </DisplayText>
          <DisplayText weight={500} as={extendedText}>
            Press{" "}
            <ButtonWithIcon
              onClick={() => {}}
              alt=""
              src={Add}
              text="Add new"
              noShadow
            />{" "}
            on Top Bar
          </DisplayText>
        </>
      ) : (
        <DisplayText margin="1rem 0" weight={500} size={1.2}>
          You are soo close!
          <br /> Now just give a name to your new project
        </DisplayText>
      )}
    </ComponentBody>
  );
};
export default NoProjectsDisplay;
const ComponentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  button {
    cursor: default;
  }
`;
const extendedText = styled.p`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
