import Footer from "./components/footer/footer";
import Timer from "./pages/timer";
import Projects from "./pages/projects";
import Options from "./pages/options";
import { Routes, Route, Navigate } from "react-router-dom";
import ClockProvider from "./components/providers/clockProvider";
import UserDBProvider from "./components/providers/userDBProvider";
import useDisplayMode from "./components/hooks/useDisplayMode";
import UserAuth from "./pages/userAuth";
import { MainBody } from "./components/styled/mainBody";
import useGetUser from "./components/hooks/getUser";

function App() {
  const {
    getColor: { textColorNormal },
    getBackground: { appBackground },
  } = useDisplayMode();

  const currentUser = useGetUser();

  if (!currentUser) return <UserAuth />;

  return (
    <UserDBProvider>
      <MainBody background={appBackground} textColor={textColorNormal}>
        <ClockProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/projects" />} />
            <Route path={"/timer"} element={<Timer />}></Route>
            <Route path={"/projects/*"} element={<Projects />}></Route>
            <Route path={"/options"} element={<Options />}></Route>
          </Routes>
        </ClockProvider>
        <Footer />
      </MainBody>
    </UserDBProvider>
  );
}
export default App;
