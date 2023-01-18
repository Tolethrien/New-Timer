import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { appContext } from "../providers/appProvider";
import { Add } from "../utils/icons";
import ProjectCard from "./projectsComponents/projectCard/projectCard";
import ProjectCardTemplate from "./projectsComponents/projectCard/projectCardTemplate";
import Head from "../styled/head";
import SearchBox from "./custome/searchBox";
import DisplayText from "../styled/displayText";
import ButtonWithIcon from "../custom/buttonWithIcon";
import { filterTPByName, sortTPByStatus } from "./utils/filtersAndSorters";

const AllProjects: React.FC = () => {
  const {
    userData,
    displayMode: { setDisplayMode, displayMode },
    currentUser,
  } = useContext(appContext);
  const buttonNewRef = useRef<HTMLButtonElement>(null);
  const [searchText, setSearchText] = useState("");
  const [templateProject, setTemplateProject] = useState(false);

  const openTempateProject = () => {
    setTemplateProject(true);
  };
  const setMode = () => {
    if (displayMode === "light") setDisplayMode("dark");
    else if (displayMode === "dark") setDisplayMode("light");
  };
  return (
    <>
      <Head>
        <DisplayText size={1.1} weight={500}>
          Hello, {currentUser!.displayName}!
        </DisplayText>
        <DisplayText size={1.8} weight={700} margin="1% 0 0 0">
          Projects On your List ({userData.length})
        </DisplayText>
        <ManagingProject>
          <SearchBox onChange={setSearchText} value={searchText} />
          <ButtonWithIcon
            alt=""
            src={Add}
            onClick={openTempateProject}
            text={"Add New"}
            reference={buttonNewRef}
          />
        </ManagingProject>
      </Head>
      <ProjectsList>
        {templateProject && (
          <ProjectCardTemplate
            referenceButton={buttonNewRef}
            setTemplateProject={setTemplateProject}
          />
        )}
        {userData.length === 0 && <p>no projects</p>}
        {userData
          .filter((e) => filterTPByName(e, searchText))
          .sort((valueA, valueB) => sortTPByStatus(valueA, valueB))
          .map((e) => (
            <ProjectCard key={e.id} data={e}></ProjectCard>
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
