import styled from "styled-components";
import Glass from "./styledComponents/glass";
import LineDevider from "./styledComponents/lineDevider";
import { login, auth } from "../firebase";
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
        <LineDevider width={80}></LineDevider>
        <LoginText>Login</LoginText>
        <form onSubmit={(e) => handleLogin(e)}>
          <UserInput
            type={"login"}
            ref={userLogin}
            // onChange={(e) => handleChange("login", e)}
          ></UserInput>
          <UserInput
            type={"password"}
            ref={userPassword}
            // onChange={(e) => handleChange("password", e)}
          ></UserInput>
          <input type="submit" value="Submit" hidden={true} />
        </form>
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
`;
const Name = styled.h3<StyleProps>``;
const LoginText = styled.div<StyleProps>``;
const UserInput = styled.input<StyleProps>``;
const CreateAccountText = styled.div<StyleProps>``;
const CreateAccountLink = styled.div<StyleProps>``;
