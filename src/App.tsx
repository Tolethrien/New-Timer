import styled from "styled-components";
import Footer from "./components/footer";
import Login from "./components/login";
function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <MainBody height={height}>
      <Login />
      <p>
        {width}, {height}
      </p>
      <Footer />
    </MainBody>
  );
}

export default App;
const MainBody = styled.div<{ height: number }>`
  position: relative;

  width: 100vw;
  /* max-width: 420px; */
  height: ${({ height }) => height}px;
  /* background-color: red; */
  background: conic-gradient(
    from 224.11deg at 61.25% 50%,
    #979454 0deg,
    #7d5757 105deg,
    #245c9d 240deg,
    #26c10d 360deg
  );
  /* margin: auto; */
  overflow: hidden;
`;
