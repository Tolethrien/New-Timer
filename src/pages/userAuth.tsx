import { MainBody } from "../components/styled/mainBody";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import useDisplayMode from "../components/hooks/useDisplayMode";
const UserAuth: React.FC = () => {
  const {
    getColor: { textColorNormal },
    getBackground: { loginBackground },
  } = useDisplayMode();
  return (
    <MainBody background={loginBackground} textColor={textColorNormal}>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </MainBody>
  );
};
export default UserAuth;
