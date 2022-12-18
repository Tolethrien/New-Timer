import styled from "styled-components";
import Glass from "../../styled/glass";
import { useContext, useState } from "react";
import { appContext } from "../../providers/appProvider";
import { RoutesChange } from "../../../pages/projects";
import Arrow from "../../../Icons/Arrow.svg";
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
        <Text size={1}>Hello! Pavel</Text>
        <Text size={1.5} weight={600}>
          Projects On your List (5)
        </Text>
        <ManagingProjects>
          <SearchBox></SearchBox>
          <NewProject>button</NewProject>
        </ManagingProjects>
      </Head>
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
  background-color: hsla(65, 76%, 41%, 1);
  width: 100%;
  border-radius: 0 0 10px 10px;
  border-bottom: 1px solid hsla(0, 2%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
const Text = styled.p<{ size: number; weight?: number }>`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  color: black;
`;
const ManagingProjects = styled.p``;
const SearchBox = styled.input``;
const NewProject = styled.button``;

// const ProjectBanner = styled.div`
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
