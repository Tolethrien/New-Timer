import Footer from "./components/footer/footer";
import Timer from "./pages/timer";
import Projects from "./pages/projects";
import Options from "./pages/options";
import { Routes, Route, Navigate } from "react-router-dom";
import ClockProvider from "./components/providers/clockProvider";
import UserDBProvider from "./components/providers/userDBProvider";
import useTheme from "./components/hooks/useTheme";
import UserAuth from "./pages/userAuth";
import MainBody from "./components/styled/components/mainBody";
import useUserAuth from "./components/hooks/useUserAuth";
import useIsOnline from "./components/hooks/useIsOnline";
import styled from "styled-components";
import ButtonAsIcon from "./components/custom/buttonAsIcon";
import { Add } from "./components/utils/icons";
import OfflineWarnings from "./components/custom/offlineWarning";

function App() {
  const {
    getColor: { textColorNormal },
    getBackground: { appBackground },
  } = useTheme();

  const currentUser = useUserAuth();

  if (!currentUser) return <UserAuth />;
  return (
    <MainBody background={appBackground} textColor={textColorNormal}>
      <UserDBProvider>
        <ClockProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/projects" />} />
            <Route path={"/timer/"} element={<Timer />}></Route>
            <Route path={"/projects/*"} element={<Projects />}></Route>
            <Route path={"/options"} element={<Options />}></Route>
          </Routes>
        </ClockProvider>
      </UserDBProvider>
      <Footer />
      <OfflineWarnings />
    </MainBody>
  );
}
export default App;
