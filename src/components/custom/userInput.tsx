import styled, { css } from "styled-components";
import useTheme from "../hooks/useTheme";
import { shakeX } from "../styled/animations/shakeX";
import { randomKey } from "../utils/randomKey";
interface UserInputProps {
  isError?: boolean;
  reference?: React.MutableRefObject<any>;
  errorMsg?: string;
  inputType?: string;
  placeholder?: string;
  noBlur?: boolean;
  noLabel?: boolean;
  forceRerender?: boolean;
}
const UserInput: React.FC<UserInputProps> = ({
  isError = false,
  reference,
  errorMsg,
  inputType = "text",
  placeholder = "placeholder",
  noBlur = false,
  noLabel = false,
}) => {
  const {
    getColor: { textError },
  } = useTheme();
  return (
    <InputLabel key={randomKey()}>
      {isError && !noLabel && (
        <LabelWarning noBlur={noBlur} textColor={textError}>
          {errorMsg}
        </LabelWarning>
      )}
      <Input
        ref={reference}
        type={inputType}
        placeholder={placeholder}
        gotError={isError}
        textColor={textError}
      />
    </InputLabel>
  );
};
export default UserInput;
const InputLabel = styled.label`
  display: "grid";
  position: relative;
`;
const LabelWarning = styled.p<{ textColor: string; noBlur: boolean }>`
  color: ${({ textColor }) => textColor};
  position: absolute;
  top: -1.3rem;
  left: 0;
  backdrop-filter: ${({ noBlur }) => !noBlur && `blur(12px)`};
  width: fit-content;
  font-weight: 500;
`;

const Input = styled.input<{ gotError?: boolean; textColor: string }>`
  background: hsla(0, 0%, 87%, 0.3);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 100%, 0.25);
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
  ${({ gotError, textColor }) =>
    gotError &&
    css`
      box-shadow: inset 1px 1px 3px 1px ${textColor};
      transition: 1s;
      animation: ${shakeX} 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    `};
`;
