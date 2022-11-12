import styled from "styled-components";
import Glass from "./styledComponents/glass";
import LineDevider from "./styledComponents/lineDevider";
import { login, auth } from "./API/firebase";
import { useRef } from "react";
//=======TYPES========
interface LoginProps {}
interface StyleProps {}

//=======COMPONENT========
const Login: React.FC<LoginProps> = (props) => {
  const userLogin = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(userLogin!.current!.value, userPassword!.current!.value);
      console.log(auth.currentUser);
    } catch (error: any) {
      alert(error.code);
    }
  };

  return (
    <Wrap>
      <Glass size={"inline"}>
        <Name>Account</Name>
        <LineDevider width={80} margin={1} thickness={3}></LineDevider>
        <LoginText>Login</LoginText>
        <Form onSubmit={(e) => handleLogin(e)}>
          <UserInput
            type={"login"}
            ref={userLogin}
            placeholder={"login..."}
          ></UserInput>
          <UserInput
            type={"password"}
            ref={userPassword}
            placeholder={"Password..."}
          ></UserInput>
          <input type="submit" value="Submit" hidden={true} />
        </Form>
        <CreateAccountText>Do not have account yet? </CreateAccountText>
        <CreateAccountLink>Register</CreateAccountLink>
      </Glass>
    </Wrap>
  );
};
export default Login;
//=======STYLES========
const Wrap = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;

const Name = styled.h3<StyleProps>`
  padding-top: 2%;
  font-size: 1.3em;
`;
const LoginText = styled.p<StyleProps>`
  font-size: 2em;
  padding-top: 20%;
  padding-bottom: 5%;
`;
const Form = styled.form<StyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 10%;
`;
const UserInput = styled.input<StyleProps>`
  border-radius: 5px;
  border: none;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  margin: 2% 0;
  text-align: center;
  width: 50%;
  height: 2em;
  background: #d4d3d3;
  :focus {
    outline: none;
  }
`;
const CreateAccountText = styled.div<StyleProps>`
  font-size: 1.6em;
  padding-bottom: 2%;
`;
const CreateAccountLink = styled.div<StyleProps>`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.2em;
  padding-bottom: 20%;
`;
