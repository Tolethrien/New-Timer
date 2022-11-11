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
  max-width: 420px;
  height: 100vh;
  background-color: red;
  margin: auto;
  overflow: hidden;
`;
