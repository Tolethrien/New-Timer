import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../custom/buttonWithIcon";
import { appContext } from "../providers/appProvider";
import ButtonAsIcon from "../styled/buttonAsIcon";
import DisplayText from "../styled/displayText";
import { Add } from "../utils/icons";
interface AccountModalProps {
  reference: React.MutableRefObject<HTMLDialogElement | null>;
  typeOfData: string;
}
interface userI {
  [key: string]: { displayName: string; value: string };
}
const AccountModal: React.FC<AccountModalProps> = ({
  reference,
  typeOfData,
}) => {
  const {
    currentUser,
    displayMode: { displayMode },
  } = useContext(appContext);
  const formRef = useRef<HTMLFormElement>(null);
  const modalschema: userI = {
    email: { displayName: "email", value: currentUser?.email ?? "" },
    password: { displayName: "Password", value: "********" },
    userName: { displayName: "Name", value: currentUser?.displayName ?? "" },
    logout: { displayName: "Logout", value: currentUser?.email ?? "" },
    default: { displayName: "", value: "" },
  };
  const closeModal = () => {
    formRef.current?.reset();
    reference.current?.close();
  };
  if (typeOfData === "logout")
    return (
      <>
        <UserDataModal ref={reference} displayMode={displayMode}>
          <ButtonAsIcon
            onClick={closeModal}
            src={Add}
            extendedStyle={CloseIcon}
          ></ButtonAsIcon>
          <DisplayText size={1.2} weight={500} margin="0 0 1rem 0">
            Logout?
          </DisplayText>
          <LogoutButtons>
            <ButtonWithIcon
              alt=""
              src={Add}
              onClick={() => console.log("s")}
              text="Yes"
              noShadow
            ></ButtonWithIcon>
            <ButtonWithIcon
              alt=""
              src={Add}
              onClick={closeModal}
              text="No"
              noShadow
            ></ButtonWithIcon>
          </LogoutButtons>
        </UserDataModal>
      </>
    );

  return (
    <UserDataModal ref={reference} displayMode={displayMode}>
      <ButtonAsIcon
        onClick={closeModal}
        src={Add}
        extendedStyle={CloseIcon}
      ></ButtonAsIcon>
      <DisplayText size={1.2} weight={500} margin="0 0 1rem 0">
        Change {modalschema[typeOfData].displayName}
      </DisplayText>
      {typeOfData !== "password" && (
        <>
          <DisplayText>
            Currenty you {modalschema[typeOfData].displayName} is
          </DisplayText>
          <DisplayText size={1.4} margin="0 0 1rem 0">
            {modalschema[typeOfData].value}
          </DisplayText>
        </>
      )}
      <Form onSubmit={(e) => e.preventDefault()} ref={formRef}>
        {typeOfData === "password" && (
          <>
            <DisplayText>Current Password</DisplayText>
            <NewValue></NewValue>
          </>
        )}
        <DisplayText extendedProps={ExpendedText}>
          New {modalschema[typeOfData].displayName}
        </DisplayText>
        <NewValue></NewValue>
        <DisplayText>Again...</DisplayText>
        <NewValue></NewValue>
        <ButtonWithIcon
          src={Add}
          alt=""
          text="Confirm"
          extendedStyle={ConfirmButton}
          onClick={() => reference.current?.close()}
          noShadow
        ></ButtonWithIcon>
      </Form>
    </UserDataModal>
  );
};
export default AccountModal;
const ComponentBody = styled.div<{}>``;
const UserDataModal = styled.dialog<{ displayMode: string }>`
  color: inherit;
  /* flex-direction: column; */
  /* width: 8rem; */
  /* height: 200px; */
  /* position: absolute; */
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  backdrop-filter: blur(20px);
  border: 1px solid red;
  border-radius: 10px;
  /* bottom: 0; */
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const LogoutButtons = styled.div`
  display: flex;
  gap: 1rem;
  button {
    padding-inline: 2rem;
  }
`;

const NewValue = styled.input`
  background: hsla(0, 0%, 87%, 0.3);
  box-shadow: inset 1.56px 1.56px 1.56px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(5px);
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1rem;
  padding-block: 0.5rem;
  color: inherit;
  padding-left: 0.5rem;
  /* text-align: center; */
  margin-bottom: 1rem;
  ::placeholder {
    color: inherit;
  }
`;
const ConfirmButton = styled.button`
  width: fit-content;
  align-self: center;
  margin-block: 1rem;
`;

const ExpendedText = styled.p`
  width: 20rem;
`;
const CloseIcon = styled.button`
  transform: rotate(45deg);
  align-self: end;
  margin-bottom: -0.5rem;
  margin-left: auto;
`;
