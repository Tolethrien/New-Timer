import styled from "styled-components";
const TaskCard: React.FC<{}> = () => {
  return <Wrap>testowa nazwa bo cos byc hehe musi</Wrap>;
};
export default TaskCard;

const Wrap = styled.div`
  color: black;
  width: 100%;
  height: 45px;
  margin-top: 0.5%;
  border-radius: 5px;
  background-color: hsla(169, 77%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
