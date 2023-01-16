import styled from "styled-components";
import Glass from "../components/styled/glass";
import { login, auth } from "../API/firebase";
import { useContext, useRef } from "react";
import PageWrap from "../components/styled/pageWrap";
import Head from "../components/styled/head";
import DisplayText from "../components/styled/displayText";
import { appContext } from "../components/providers/appProvider";
import ButtonWithIcon from "../components/custom/buttonWithIcon";
import { Logout } from "../components/utils/icons";
//=======TYPES========
interface LoginProps {}

//=======COMPONENT========
const Login: React.FC<LoginProps> = (props) => {
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  const handleLogin = () => {
    login(mailRef.current!.value, passRef.current!.value);
  };
  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600} margin="0 0 3% 0">
          Welcome to New Timer
        </DisplayText>
        <DisplayText margin="0 0 3% 0">
          your personal Projects Time measuring App
        </DisplayText>
      </Head>
      <LoginBody>
        <DisplayText size={1.5} weight={500} extendedStyle={ExtendedText}>
          Login to begin <br />
          your productivity
        </DisplayText>
        <UserForm onSubmit={(e) => (e.preventDefault(), handleLogin())}>
          <UserInput ref={mailRef} type="email" placeholder="email..." />
          <UserInput ref={passRef} type="password" placeholder="password..." />
          <ButtonWithIcon
            src={Logout}
            alt={""}
            onClick={handleLogin}
            extendedStyle={ExtendedLoginButton}
            text={"Login"}
          ></ButtonWithIcon>
        </UserForm>
        <CreateAcc>
          <DarkModeBackground displayMode={displayMode}>
            <DisplayText>Don’t have account yet?</DisplayText>
          </DarkModeBackground>
          <ButtonWithIcon
            src={Logout}
            alt={""}
            onClick={function (): void {}}
            text={"Click Here"}
            extendedStyle={ExtendedRegisterButton}
          ></ButtonWithIcon>
        </CreateAcc>
      </LoginBody>
    </PageWrap>
  );
};
export default Login;
//=======STYLES========
const LoginBody = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 25%;
  gap: 1rem;
`;
const UserInput = styled.input`
  background: hsla(0, 0%, 87%, 0.3);
  box-shadow: inset 1.56px 1.56px 1.56px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(5px);
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1rem;
  padding-block: 0.5rem;
  color: inherit;
  text-align: center;
  ::placeholder {
    color: inherit;
  }
`;
const CreateAcc = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-block: 25%;
  gap: 0.5rem;
`;
const DarkModeBackground = styled.div<{ displayMode: string }>`
  white-space: nowrap;
  background-color: ${({ displayMode }) =>
    displayMode === "light" ? `transparent` : `hsla(0, 0%, 0%, 0.4)`};
  padding: 5% 3%;
  border-radius: 5px;
  backdrop-filter: blur(1px);
`;
const ExtendedText = styled.p`
  text-align: center;
`;
const ExtendedLoginButton = styled.button`
  padding: 0.3rem 0.9em;
  border: none;
  box-shadow: 0px 4.16px 4.16px rgba(0, 0, 0, 0.25),
    inset 0px 1.04px 1.04px rgba(255, 255, 255, 0.25);
`;
const ExtendedRegisterButton = styled.button`
  padding: 0.3rem 0.4em;
  border: none;
  box-shadow: 0px 4.16px 4.16px rgba(0, 0, 0, 0.25),
    inset 0px 1.04px 1.04px rgba(255, 255, 255, 0.25);
  align-self: flex-start;
`;
