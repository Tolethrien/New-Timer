import { useState, useRef } from "react";
import styled from "styled-components";
import { Add } from "../utils/icons";
import ProjectCard from "./projectsComponents/projectCard/projectCard";
import ProjectCardTemplate from "./projectsComponents/projectCard/projectCardTemplate";
import Head from "../custom/head";
import SearchBox from "./custom/searchBox";
import DisplayText from "../styled/components/displayText";
import ButtonWithIcon from "../custom/buttonWithIcon";
import { filterTPByName, sortTPByStatus } from "./utils/filtersAndSorters";
import useDataFinder from "../hooks/useDataFinder";
import useUserAuth from "../hooks/useUserAuth";
import NoProjectsDisplay from "./NoProjectsDisplay";

const AllProjects: React.FC = () => {
  const userData = useDataFinder("all");
  const currentUser = useUserAuth();
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const [searchText, setSearchText] = useState("");
  const [isTemplateProject, setIsTemplateProject] = useState(false);

  const openTempateProject = () => {
    setIsTemplateProject(true);
  };

  return (
    <>
      <Head>
        <DisplayText size={1.1} weight={500}>
          Hello, {currentUser?.displayName}!
        </DisplayText>
        <DisplayText size={1.8} weight={700} margin="1% 0 0 0">
          Projects On your List ({userData?.length})
        </DisplayText>
        <ManagingProject>
          <SearchBox onChange={setSearchText} value={searchText} />
          <ButtonWithIcon
            alt=""
            src={Add}
            onClick={openTempateProject}
            text={"Add New"}
            animation="invert"
            reference={buttonNewRef}
          />
        </ManagingProject>
      </Head>
      <ProjectsList>
        {userData?.length === 0 && (
          <NoProjectsDisplay isTemplateOpen={isTemplateProject} />
        )}
        {isTemplateProject && (
          <ProjectCardTemplate
            referenceButton={buttonNewRef}
            isTemplateProject={isTemplateProject}
            setTemplateProject={setIsTemplateProject}
          />
        )}
        {userData
          ?.filter((el) => filterTPByName(el, searchText))
          .sort((valueA, valueB) => sortTPByStatus(valueA, valueB))
          .map((el) => (
            <ProjectCard key={el.id} data={el}></ProjectCard>
          ))}
      </ProjectsList>
    </>
  );
};
export default AllProjects;

const ManagingProject = styled.div`
  width: 100%;
  display: flex;
  margin: 3% 0;
  justify-content: space-between;
`;

const ProjectsList = styled.div`
  width: 98%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;
