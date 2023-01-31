import { useContext, useRef } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../components/custom/buttonWithIcon";
import DisplayText from "../components/styled/displayText";
import Head from "../components/styled/head";
import PageWrap from "../components/styled/pageWrap";
import { CreateAcc } from "../components/utils/icons";
import { RegisterNewUser } from "../API/userAuth";
import { Navigate } from "react-router-dom";
import { authContext } from "../components/providers/authProvider";
import useTheme from "../components/hooks/useTheme";
interface RegisterProps {}
const Register: React.FC<RegisterProps> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repeatRef = useRef<HTMLInputElement>(null);

  const handleRegister = () => {
    if (nameRef.current?.value === "") return alert("podaj kurwo imie");
    if (passRef.current?.value !== repeatRef.current?.value)
      return alert("pojebales hasla... kurwo!");
    RegisterNewUser(
      mailRef.current?.value!,
      passRef.current?.value!,
      nameRef.current?.value!
    );
  };
  return (
    <PageWrap>
      <Head>
        <DisplayText size={1.5} weight={600} margin="0 0 3% 0">
          Registration
        </DisplayText>
        <DisplayText margin="0 0 3% 0">your journey start here...</DisplayText>
      </Head>
      <LoginBody>
        <DisplayText size={1.5} weight={500} extendedStyle={ExtendedText}>
          We almost there.
          <br /> Just tell me your...
        </DisplayText>
        <UserForm onSubmit={(e) => e.preventDefault()}>
          <UserInput ref={nameRef} type="text" placeholder="Name..." />
          <UserInput ref={mailRef} type="email" placeholder="email..." />
          <UserInput ref={passRef} type="password" placeholder="password..." />
          <UserInput ref={repeatRef} type="password" placeholder="repeat..." />
          <ButtonWithIcon
            src={CreateAcc}
            alt={""}
            onClick={handleRegister}
            text={"Let’s Start!"}
            extendedStyle={ExtendedRegisterButton}
          ></ButtonWithIcon>
        </UserForm>
      </LoginBody>
    </PageWrap>
  );
};
export default Register;
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
const ExtendedText = styled.p`
  text-align: center;
`;
const ExtendedRegisterButton = styled.button`
  padding: 0.3rem 0.4em;
  border: none;
  box-shadow: 0px 4.16px 4.16px rgba(0, 0, 0, 0.25),
    inset 0px 1.04px 1.04px rgba(255, 255, 255, 0.25);
`;
