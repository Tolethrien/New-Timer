import styled from "styled-components";
interface UserDataModalProps {}
const UserDataModal: React.FC<UserDataModalProps> = (props) => {
  return <ComponentBody>UserDataModal</ComponentBody>;
};
export default UserDataModal;
const ComponentBody = styled.dialog<{}>`
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: red;
  bottom: 0;
`;
