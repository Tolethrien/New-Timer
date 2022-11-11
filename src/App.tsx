import styled from "styled-components";
import Footer from "./components/footer";
import Login from "./components/login";
function App() {
  return (
    <MainBody>
      <Login />
      <Footer />
    </MainBody>
  );
}

export default App;
const MainBody = styled.div`
  position: relative;

  width: 100vw;
  /* max-width: 420px; */
  height: 100vh;
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
