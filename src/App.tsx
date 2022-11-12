import { useContext } from "react";
import styled from "styled-components";
import Footer from "./components/footer";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Calendar from "./pages/calendar";
import Timer from "./pages/timer";
import Data from "./pages/data";
import Projects from "./pages/projects";
import Options from "./pages/options";
import { appContext } from "./global/provider";
import { Routes, Route } from "react-router-dom";
//=======TYPES========
interface styleProps {
  height: number;
  textColor: string;
}
//=======COMPONENT========
function App() {
  const height = window.innerHeight;
  const {
    text: { textColor },
  } = useContext(appContext);
  return (
    <MainBody height={height} textColor={textColor}>
      <Routes>
        <Route path={"/"} element={<Dashboard />}></Route>
        <Route path={"/timer"} element={<Timer />}></Route>
        <Route path={"/calendar"} element={<Calendar />}></Route>
        <Route path={"/data"} element={<Data />}></Route>
        <Route path={"/projects"} element={<Projects />}></Route>
        <Route path={"/options"} element={<Options />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
      </Routes>
      <Footer />
    </MainBody>
  );
}
export default App;
//=======STYLES========
const MainBody = styled.div<styleProps>`
  position: relative;
  color: ${({ textColor }) => textColor};
  width: 100vw;
  max-width: 420px;
  height: ${({ height }) => height}px;
  background: conic-gradient(
    from 224.11deg at 61.25% 50%,
    #979454 0deg,
    #7d5757 105deg,
    #245c9d 240deg,
    #26c10d 360deg
  );
  margin: auto;
  overflow: hidden;
`;
