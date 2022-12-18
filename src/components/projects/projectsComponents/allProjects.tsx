import styled from "styled-components";
import Glass from "../../styled/glass";
import { useContext, useState } from "react";
import { appContext } from "../../providers/appProvider";
import { RoutesChange } from "../../../pages/projects";
import Loop from "../../../Icons/Loop.svg";
import Add from "../../../Icons/Add.svg";
import ProjectCard from "./projectCard";
// import SearchBox from "./searchBox";
interface ProjectsOverallProps {
  changeRoute: (route: RoutesChange) => void;
}
interface StyleProps {}

const AllProjects: React.FC<ProjectsOverallProps> = ({ changeRoute }) => {
  const { userData } = useContext(appContext);
  // console.log(userData);
  const [searchText, setSearchText] = useState("");
  const taskDone = (tasks: { data: { finished: boolean } }[]) => {
    let done = tasks.filter((e) => e.data.finished === true);
    return done.length > 0 ? done.length : 0;
  };
  const filterByName = (value: { data: { name: string } }) => {
    return value.data.name.toLowerCase().includes(searchText.toLowerCase());
  };
  return (
    //zrobic text globalny
    //zrobic komponent zolty globalny
    <>
      <Head>
        <Text size={1.1} weight={500} margin="4% 0 0 0">
          Hello! Pavel
        </Text>
        <Text size={1.8} weight={700} margin="1% 0 3% 0">
          Projects On your List (5)
        </Text>
        <ManagingProject>
          <SearchBox>
            <SearchBoxImg src={Loop} alt="searchBar"></SearchBoxImg>
            <SearchBoxInput placeholder="Search..."></SearchBoxInput>
          </SearchBox>

          <NewProject>
            <NewProjectImg src={Add} alt=""></NewProjectImg>
            Add New
          </NewProject>
        </ManagingProject>
      </Head>
      <ProjectsList>
        {userData.filter(filterByName).map((e) => (
          <ProjectCard></ProjectCard>
        ))}
      </ProjectsList>
      {/* <p>All Projects</p>
      <SearchBox search={{ value: searchText, set: setSearchText }}></SearchBox>
      <Glass size={"inline"} margin="5% 0" padding="10px 0">
        {userData.filter(filterByName).map((e) => (
          <ProjectBanner
            key={e.id}
            onClick={() => changeRoute({ projectId: e.id })}
          >
            <ProjectColor color={e.data.color} />
            <ProjectData>
              <Name>{e.id}</Name>
              <NumberOfTasks>
                zadania: {taskDone(e.tasks) + "/" + e.tasks.length}
              </NumberOfTasks>
            </ProjectData>
            <PercentOfComplete>50%</PercentOfComplete>
            <GoToButton>
              <Icon src={Arrow} alt={""}></Icon>
            </GoToButton>
          </ProjectBanner>
        ))}
      </Glass> */}
    </>
  );
};
export default AllProjects;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: hsla(65, 76%, 41%, 1);
  width: 100%;
  border-radius: 0 0 10px 10px;
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
`;
const NewProjectImg = styled.img`
  width: 15px;
  padding-right: 5px;
`;
const ProjectsList = styled.div`
  margin-top: 5px;
  width: 95%;
  /* overflow-y: scroll; */
`;
// const ProjectBanner = styled.div
//   display: flex;
//   align-items: center;
//   width: 90%;
//   background-color: red;
//   border-radius: 5px;
//   outline: 2px solid #b6b6b6;
//   filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.25));
//   overflow: hidden;
//   margin: 1.5% 0;
//   cursor: pointer;
// `;
// const Head = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const ProjectColor = styled.div<{ color: string }>`
//   width: 7%;
//   height: 100%;
//   background-color: ${({ color }) => color};
// `;
// const ProjectData = styled.div`
//   width: 80%;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;
// const Name = styled.div`
//   align-self: center;
// `;
// const NumberOfTasks = styled.div`
//   padding-left: 5%;
// `;
// const PercentOfComplete = styled.div`
//   width: 20%;
//   text-align: center;
// `;
// const GoToButton = styled.div`
//   width: 10%;
//   background: none;
//   border: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const Icon = styled.img``;
