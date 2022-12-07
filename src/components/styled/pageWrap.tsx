import styled from "styled-components";
const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: calc(100% - 55px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
export default PageWrap;
