import { type } from "@testing-library/user-event/dist/type";
import { User } from "firebase/auth";
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../API/firebase";
import ButtonWithIcon from "../custom/buttonWithIcon";
import { appContext } from "../providers/appProvider";
import ButtonAsIcon from "../styled/buttonAsIcon";
import DisplayText from "../styled/displayText";
import { Add, Logout } from "../utils/icons";
import AccountModal from "./accountModal";
import OptionBar from "./optionBar";
interface AccountOptionsProps {}
interface userI {
  [key: string]: { displayName: string; value: string };
}
const AccountOptions: React.FC<AccountOptionsProps> = (props) => {
  const signout = () => {
    logout();
  };

  const [typeOfData, setTypeOfData] = useState("default");

  const testRef = useRef<HTMLDialogElement>(null);

  const openModal = (name: string) => {
    setTypeOfData(name);
    testRef.current?.showModal();
  };
  return (
    <>
      <OptionBar>
        <DisplayText>Email</DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Change"
          noShadow
          onClick={() => openModal("email")}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Password</DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Change"
          noShadow
          onClick={() => openModal("password")}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Name</DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Change"
          noShadow
          onClick={() => openModal("userName")}
        ></ButtonWithIcon>
      </OptionBar>
      <OptionBar>
        <DisplayText>Logout </DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Logout"
          noShadow
          onClick={() => openModal("logout")}
        ></ButtonWithIcon>
      </OptionBar>
      <AccountModal reference={testRef} typeOfData={typeOfData} />
    </>
  );
};
export default AccountOptions;
