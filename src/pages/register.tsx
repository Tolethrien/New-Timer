import { useRef, useState } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../components/custom/buttonWithIcon";
import DisplayText from "../components/styled/components/displayText";
import Head from "../components/custom/head";
import PageWrap from "../components/styled/components/pageWrap";
import { BackArrow, CreateAcc } from "../components/utils/icons";
import { RegisterNewUser } from "../API/userAuthentication";
import { useNavigate } from "react-router-dom";
import UserInput from "../components/custom/userInput";
import ButtonAsIcon from "../components/custom/buttonAsIcon";
const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repeatRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  const handleRegister = () => {
    if (nameRef.current?.value === "") {
      return setWarning("name");
    } else if (!mailRef.current?.value.includes("@")) {
      return setWarning("email");
    } else if (
      passRef.current?.value === "" ||
      repeatRef.current?.value === "" ||
      passRef.current?.value !== repeatRef.current?.value
    ) {
      return setWarning("repeat");
    }
    RegisterNewUser(
      mailRef.current?.value!,
      passRef.current?.value!,
      nameRef.current?.value!
    );
  };

  return (
    <PageWrap>
      <Head>
        <Title>
          <ButtonAsIcon
            src={BackArrow}
            size={[1.5, 2.5]}
            position={"50% 70%"}
            onClick={() => navigate("/login")}
          ></ButtonAsIcon>
          <DisplayText size={1.5} weight={600} margin="0 0 3% 0">
            Registration
          </DisplayText>
        </Title>
        <DisplayText margin="0 0 3% 0">your journey start here...</DisplayText>
      </Head>
      <LoginBody>
        <DisplayText size={1.5} weight={500} as={ExtendedText}>
          We almost there.
          <br /> Just tell me your...
        </DisplayText>
        <UserForm onSubmit={(e) => e.preventDefault()}>
          <UserInput
            errorMsg="Name is Required"
            inputType="text"
            isError={warning === "name"}
            reference={nameRef}
            placeholder={"Name..."}
          />
          <UserInput
            errorMsg="invalid email adress"
            inputType="email"
            isError={warning === "email"}
            reference={mailRef}
            placeholder={"email..."}
          />
          <UserInput
            errorMsg="not the same"
            inputType="password"
            isError={warning === "repeat"}
            reference={passRef}
            placeholder={"password..."}
          />
          <UserInput
            inputType="password"
            isError={warning === "repeat"}
            reference={repeatRef}
            placeholder={"again..."}
          />

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

const Title = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 1rem;
`;
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
  gap: 1.5rem;
`;

const ExtendedText = styled.p`
  text-align: center;
`;
const ExtendedRegisterButton = styled.button`
  padding: 0.4rem 0.7em;
  border: none;
  box-shadow: 0px 4.16px 4.16px rgba(0, 0, 0, 0.25),
    inset 0px 1.04px 1.04px rgba(255, 255, 255, 0.25);
`;
