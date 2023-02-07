import styled from "styled-components";
import { logout } from "../../API/userAuthentication";
import ButtonWithIcon from "../custom/buttonWithIcon";
import UserDataModal from "../custom/userDataModal";
import DisplayText from "../styled/components/displayText";
import { BackArrow, Logout } from "../utils/icons";
interface AccountLogoutModalProps {
  reference: React.MutableRefObject<HTMLDialogElement | null>;
  closeModal: () => void;
}
const AccountLogoutModal: React.FC<AccountLogoutModalProps> = ({
  reference,
  closeModal,
}) => {
  return (
    <UserDataModal reference={reference} onClose={closeModal}>
      <DisplayText size={1.2} weight={500} margin="0 0 1rem 0">
        Logout?
      </DisplayText>
      <LogoutButtons>
        <ButtonWithIcon
          alt=""
          src={Logout}
          onClick={() => {
            logout();
          }}
          text="Yes"
          noShadow
        ></ButtonWithIcon>
        <ButtonWithIcon
          alt=""
          src={BackArrow}
          onClick={closeModal}
          text="No"
          noShadow
        ></ButtonWithIcon>
      </LogoutButtons>
    </UserDataModal>
  );
};
export default AccountLogoutModal;

const LogoutButtons = styled.div`
  display: flex;
  gap: 1rem;
  button {
    width: 50%;
  }
`;
