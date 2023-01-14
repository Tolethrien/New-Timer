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
import BodyImg from "./backgrounds/LofiMain.jpg";
import MainNight from "./backgrounds/mainNight.jpg";

//=======TYPES========
//=======COMPONENT========
function App() {
  const {
    displayMode: { displayMode },
    primary: { primaryColor },
  } = useStore("app");
  document
    .querySelector('meta[name="theme-color"]')!
    .setAttribute(
      "content",
      `${
        displayMode === "light"
          ? `hsla(40, 76%, 69%, 0.8)`
          : `hsla(261, 16%, 40%, 0.8)`
      }`
    );
  //
  return (
    <MainBody displayMode={displayMode}>
      <>
        <Clock>
          <Routes>
            <Route path={"/"} element={<Dashboard />}></Route>
            <Route path={"/timer"} element={<Timer />}></Route>
            <Route path={"/calendar"} element={<Calendar />}></Route>
            <Route path={"/data"} element={<Data />}></Route>
            <Route path={"/projects/*"} element={<Projects />}></Route>
            <Route path={"/options"} element={<Options />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
          </Routes>
        </Clock>
        <Footer />
      </>
    </MainBody>
  );
}
export default App;
//=======STYLES========
const MainBody = styled.main<{ displayMode: string }>`
  position: relative;
  width: 100vw;
  max-width: 420px;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  background-image: ${({ displayMode }) =>
    `url(${displayMode === "light" ? BodyImg : MainNight})`};
  background-size: cover;
  overflow-y: auto;
  color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 25 : 80}%, 1)`};
`;
