import styled from "styled-components";
import { useRef, useState } from "react";
import { login } from "../API/userAuthentication";
import { Logout } from "../components/utils/icons";
import { useNavigate } from "react-router-dom";
import PageWrap from "../components/styled/components/pageWrap";
import Head from "../components/custom/head";
import DisplayText from "../components/styled/components/displayText";
import ButtonWithIcon from "../components/custom/buttonWithIcon";
import useTheme from "../components/hooks/useTheme";
import UserInput from "../components/custom/userInput";

const Login: React.FC = () => {
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const [errored, setErrored] = useState(false);

  const handleLogin = () => {
    login(mailRef.current!.value, passRef.current!.value, () => {
      setErrored(true);
    });
  };
  const redirectToRegister = () => {
    navigate("/register", { replace: true });
  };

  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600} margin="0 0 3% 0">
          Welcome to New Timer
        </DisplayText>
        <DisplayText margin="0 0 3% 0">
          Your personal project time-tracking app
        </DisplayText>
      </Head>
      <LoginBody>
        <DisplayText size={1.5} weight={500} as={ExtendedText}>
          Login to begin <br />
          your productivity
          <DemoText>(demo)</DemoText>
        </DisplayText>
        <UserForm onSubmit={(e) => e.preventDefault()}>
          <UserInput
            errorMsg="Wrong email..."
            isError={errored}
            inputType="email"
            reference={mailRef}
            placeholder={"email..."}
          />
          <UserInput
            errorMsg="...or password"
            isError={errored}
            inputType="password"
            reference={passRef}
            placeholder={"password..."}
          />
          <ButtonWithIcon
            src={Logout}
            alt={""}
            onClick={() => handleLogin()}
            extendedStyle={ExtendedLoginButton}
            text={"Login"}
          ></ButtonWithIcon>
        </UserForm>
        <CreateAcc>
          <DarkModeBackground bodyColor={theme}>
            <DisplayText>Don’t have account yet?</DisplayText>
          </DarkModeBackground>
          <ButtonWithIcon
            src={Logout}
            alt={""}
            onClick={redirectToRegister}
            text={"Click Here"}
            extendedStyle={ExtendedRegisterButton}
          ></ButtonWithIcon>
        </CreateAcc>
      </LoginBody>
    </PageWrap>
  );
};
export default Login;

const LoginBody = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0;
  flex-grow: 1;
  gap: 15%;
`;
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const CreateAcc = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;
const DarkModeBackground = styled.div<{ bodyColor: string }>`
  background-color: ${({ bodyColor }) =>
    bodyColor === "Light" ? `transparent` : `hsla(0, 0%, 0%, 0.4)`};
  white-space: nowrap;
  border-radius: 5px;
  padding: 5% 8%;
  backdrop-filter: ${({ bodyColor }) => bodyColor === "Dark" && "blur(2px)"};
`;
const ExtendedText = styled.p`
  text-align: center;
  position: relative;
`;
const DemoText = styled.span`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;
const ExtendedLoginButton = styled.button`
  padding: 0.4rem 1em;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
`;
const ExtendedRegisterButton = styled.button`
  padding: 0.4rem 0.6em;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  align-self: flex-start;
`;
