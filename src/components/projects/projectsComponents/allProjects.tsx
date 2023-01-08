import styled from "styled-components";
import { useContext, useState } from "react";
import { appContext } from "../../providers/appProvider";
import { Loop, Add } from "../../utils/icons";
import ProjectCard from "./projectCard";
import { addProject } from "../../../API/handleDocs";

interface ProjectsOverallProps {}
interface StyleProps {}

const AllProjects: React.FC<ProjectsOverallProps> = () => {
  const {
    userData,
    newColor: { newColor },
  } = useContext(appContext);
  // console.log(userData);
  const [searchText, setSearchText] = useState("");

  const filterByName = (value: { data: { name: string } }) => {
    return value.data.name.toLowerCase().includes(searchText.toLowerCase());
  };
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const sortByStatus = (
    valueA: { data: { status: string } },
    valueB: { data: { status: string } }
  ) => {
    let statusIndex: { [key: string]: number } = {
      Active: 1,
      "On Hold": 2,
      Done: 3,
    };
    return statusIndex[valueA.data.status] - statusIndex[valueB.data.status];
  };
  return (
    <>
      <Head hue={newColor}>
        <Text size={1.1} weight={500} margin="4% 0 0 0">
          Hello! Pavel
        </Text>
        <Text size={1.8} weight={700} margin="1% 0 3% 0">
          Projects On your List ({userData.length})
        </Text>
        <ManagingProject>
          <SearchBox>
            <SearchBoxImg src={Loop} alt="searchBar"></SearchBoxImg>
            <SearchBoxInput
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setText(e)}
            ></SearchBoxInput>
          </SearchBox>

          <NewProject onClick={() => addProject("Inter Stelaris Kanis Lupus")}>
            <NewProjectImg src={Add} alt=""></NewProjectImg>
            Add New
          </NewProject>
        </ManagingProject>
      </Head>
      <ProjectsList>
        {userData
          .filter(filterByName)
          .sort(sortByStatus)
          .map((e) => (
            <ProjectCard key={e.id} data={e}></ProjectCard>
          ))}
      </ProjectsList>
    </>
  );
};
export default AllProjects;

const Head = styled.div<{ hue: number }>`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ hue }) => `hsla(${hue}, 20%, 74%, 1)`};
  width: 100%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid hsla(0, 2%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
const Text = styled.p<{
  size: number;
  weight?: number;
  margin?: string;
  padding?: string;
}>`
  font-style: normal;
  width: 90%;
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: black;
`;
const ManagingProject = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 1.5rem;
  margin-left: 5%;
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  width: 50%;
  height: 100%;
`;
const SearchBoxInput = styled.input`
  background-color: transparent;
  border: none;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: #414141;
    font-weight: 600;
  }
`;
const SearchBoxImg = styled.img`
  height: 60%;
  padding-left: 10px;
`;
const NewProject = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
  border-radius: 5px;
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  cursor: pointer;
`;
const NewProjectImg = styled.img`
  width: 15px;
  padding-right: 5px;
`;
const ProjectsList = styled.div`
  /* margin-top: 5px; */
  width: 98%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;
