import styled from "styled-components";
import Footer from "./components/footer/footer";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Calendar from "./pages/calendar";
import Timer from "./pages/timer";
import Data from "./pages/data";
import Projects from "./pages/projects";
import Options from "./pages/options";
import { Routes, Route } from "react-router-dom";
import Clock from "./components/providers/clockProvider";
import useStore from "./components/hooks/useStore";
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
  } = useStore("app");
  document
    .querySelector('meta[name="theme-color"]')!
    .setAttribute("content", "hsla(140, 76%, 41%, 1)");
  //
  return (
    <MainBody height={height} textColor={textColor}>
      <Clock>
        <Routes>
          <Route path={"/"} element={<Dashboard />}></Route>
          <Route path={"/timer"} element={<Timer />}></Route>
          <Route path={"/calendar"} element={<Calendar />}></Route>
          <Route path={"/data"} element={<Data />}></Route>
          <Route path={"/projects//*"} element={<Projects />}></Route>
          <Route path={"/options"} element={<Options />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
        </Routes>
      </Clock>
      <Footer />
    </MainBody>
  );
}
export default App;
//=======STYLES========
const MainBody = styled.main<styleProps>`
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
