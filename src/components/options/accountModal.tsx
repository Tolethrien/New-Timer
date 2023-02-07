import { useRef, useState } from "react";
import styled from "styled-components";
import { updateAcc, updateAccType } from "../../API/userAuthentication";
import ButtonWithIcon from "../custom/buttonWithIcon";
import DisplayText from "../styled/components/displayText";
import { Add } from "../utils/icons";
import useUserAuth from "../hooks/useUserAuth";
import UserInput from "../custom/userInput";
import { useNavigate } from "react-router-dom";
import { ModalInputsType } from "./accountOptions";
import UserDataModal from "../custom/userDataModal";

interface AccountModalProps {
  reference: React.MutableRefObject<HTMLDialogElement | null>;
  typeOfData: ModalInputsType;
}

type ModalSchemaType = {
  [K in ModalInputsType]: { displayName: string; value: string; error: string };
};

const AccountModal: React.FC<AccountModalProps> = ({
  reference,
  typeOfData,
}) => {
  const currentUser = useUserAuth();
  const [isErrored, setisErrored] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const modalschema: ModalSchemaType = {
    email: {
      displayName: "email",
      value: currentUser?.email ?? "",
      error: "email should contain @ character or emails are not the same",
    },
    password: {
      displayName: "Password",
      value: "********",
      error:
        "password should contain at least 8 characters or passwords are not the same",
    },
    userName: {
      displayName: "Name",
      value: currentUser?.displayName ?? "",
      error:
        "name should contain at least 1 character or names are not the same",
    },
    logout: {
      displayName: "Logout",
      value: currentUser?.email ?? "",
      error: "",
    },
    default: { displayName: "", value: "", error: "" },
  };

  const closeModal = () => {
    setisErrored(false);
    formRef.current?.reset();
    reference.current?.close();
  };

  const updateAccountValue = async ({ param, value }: updateAccType) => {
    await updateAcc({ param, value });
    closeModal();
    navigate("/options");
    // hack to reload component to update account info
    //(navigate to the same component)
  };

  const handleConfirmForm = () => {
    switch (typeOfData) {
      case "userName": {
        if (
          firstInputRef.current?.value === "" ||
          secondInputRef.current?.value === "" ||
          firstInputRef.current?.value !== secondInputRef.current?.value
        ) {
          setisErrored(true);
        } else {
          updateAccountValue({
            param: "name",
            value: firstInputRef.current!.value!,
          });
        }
        break;
      }
      case "email": {
        if (
          firstInputRef.current?.value === "" ||
          !firstInputRef.current?.value.includes("@") ||
          secondInputRef.current?.value === "" ||
          firstInputRef.current?.value !== secondInputRef.current?.value
        ) {
          setisErrored(true);
        } else {
          updateAccountValue({
            param: "email",
            value: firstInputRef.current!.value!,
          });
        }
        break;
      }
      case "password": {
        if (
          firstInputRef.current?.value === "" ||
          firstInputRef.current?.value.length! < 8 ||
          secondInputRef.current?.value === "" ||
          firstInputRef.current?.value !== secondInputRef.current?.value
        ) {
          setisErrored(true);
        } else {
          updateAccountValue({
            param: "password",
            value: firstInputRef.current!.value!,
          });
        }
        break;
      }
      default:
    }
  };

  return (
    <UserDataModal reference={reference} onClose={closeModal}>
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
        <DisplayText>New {modalschema[typeOfData].displayName}</DisplayText>
        <UserInput
          errorMsg={modalschema[typeOfData].error}
          inputType="text"
          isError={isErrored}
          placeholder={`New ${modalschema[typeOfData].displayName}`}
          reference={firstInputRef}
          noBlur
        ></UserInput>
        <DisplayText>Again...</DisplayText>
        <UserInput
          errorMsg="names are not the same"
          inputType="text"
          isError={isErrored}
          placeholder="Again..."
          reference={secondInputRef}
          noLabel
        ></UserInput>
        <ButtonWithIcon
          src={Add}
          alt=""
          text="Confirm"
          extendedStyle={ConfirmButton}
          onClick={() => handleConfirmForm()}
          noShadow
        ></ButtonWithIcon>
      </Form>
    </UserDataModal>
  );
};
export default AccountModal;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    text-align: start;
    padding-left: 1rem;
    box-sizing: border-box;
  }
`;

const ConfirmButton = styled.button`
  width: fit-content;
  align-self: center;
  margin-block: 1rem;
`;
