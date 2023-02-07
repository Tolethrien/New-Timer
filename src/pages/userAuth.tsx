import MainBody from "../components/styled/components/mainBody";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import useTheme from "../components/hooks/useTheme";
const UserAuth: React.FC = () => {
  const {
    getColor: { textColorNormal },
    getBackground: { loginBackground },
  } = useTheme();
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
