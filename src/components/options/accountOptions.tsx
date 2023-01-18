import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../API/firebase";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../styled/displayText";
import { Logout } from "../utils/icons";
import OptionBar from "./optionBar";
interface AccountOptionsProps {}
const AccountOptions: React.FC<AccountOptionsProps> = (props) => {
  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <>
      <OptionBar>
        <DisplayText>Email</DisplayText>
      </OptionBar>
      <OptionBar>
        <DisplayText>Password</DisplayText>
      </OptionBar>
      <OptionBar>
        <DisplayText>Name</DisplayText>
      </OptionBar>
      <OptionBar>
        <DisplayText>Logout </DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Logout"
          onClick={signout}
        ></ButtonWithIcon>
      </OptionBar>
    </>
  );
};
export default AccountOptions;
