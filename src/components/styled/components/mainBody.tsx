import styled from "styled-components";

const MainBody = styled.main<{
  background: string;
  textColor: string;
}>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 420px;
  height: 100vh;
  margin-inline: auto;
  overflow: hidden;
  transition: 1.5s;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  overflow-y: auto;
  color: ${({ textColor }) => textColor};
`;
export default MainBody;
