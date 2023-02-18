import { useEffect, useRef, useState } from "react";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../styled/components/displayText";
import { Logout } from "../utils/icons";
import AccountLogoutModal from "./accountLogoutModal";
import AccountModal from "./accountModal";
import OptionBar from "./optionBar";

export type ModalInputsType =
  | "password"
  | "email"
  | "userName"
  | "logout"
  | "default";

const AccountOptions: React.FC = () => {
  const [typeOfData, setTypeOfData] = useState<ModalInputsType>("default");
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (name: ModalInputsType) => {
    setTypeOfData(name);
    setMounted((prev) => !prev);
  };
  const closeModal = () => {
    modalRef.current?.close();
  };
  useEffect(() => {
    if (typeOfData !== "default") {
      modalRef.current!.showModal();
    }
  }, [mounted]);
  return (
    <>
      <OptionBar>
        <DisplayText>Email</DisplayText>
        <ButtonWithIcon
          src={Logout}
          alt=""
          text="Change"
          noShadow
          animation="inset"
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
          animation="inset"
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
          animation="inset"
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
          animation="inset"
          onClick={() => openModal("logout")}
        ></ButtonWithIcon>
      </OptionBar>
      {typeOfData === "logout" ? (
        <AccountLogoutModal closeModal={closeModal} reference={modalRef} />
      ) : (
        <AccountModal reference={modalRef} typeOfData={typeOfData} />
      )}
    </>
  );
};
export default AccountOptions;
