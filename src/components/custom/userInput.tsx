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
    getColor: { textError, inputColor },
  } = useTheme();
  return (
    <InputLabel key={randomKey()}>
      {isError && !noLabel && (
        <LabelWarning noBlur={noBlur} textColor={textError}>
          {errorMsg}
        </LabelWarning>
      )}
      <InputAfter
        gotError={isError}
        textColor={textError}
        inputBackgroundColor={inputColor}
      >
        <Input
          ref={reference}
          type={inputType}
          inputBackgroundColor={inputColor}
          placeholder={placeholder}
          gotError={isError}
          textColor={textError}
        />
      </InputAfter>
    </InputLabel>
  );
};
export default UserInput;
const InputLabel = styled.label`
  display: "grid";
`;
const LabelWarning = styled.p<{ textColor: string; noBlur: boolean }>`
  color: ${({ textColor }) => textColor};
  backdrop-filter: ${({ noBlur }) => !noBlur && `blur(12px)`};
  width: fit-content;
  font-weight: 500;
`;
const InputAfter = styled.div<{
  gotError?: boolean;
  textColor: string;
  inputBackgroundColor: string;
}>`
  position: relative;
  ${({ gotError, textColor }) =>
    gotError &&
    css`
      transition: 1s;
      animation: ${shakeX} 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
      :after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-style: solid;
        filter: drop-shadow(2px 2px 2px hsla(0, 0%, %, 0.25));
        border-width: 1.2rem 1.2rem 0 0;
        border-color: ${textColor} transparent transparent transparent;
      }
    `};
`;
const Input = styled.input<{
  gotError?: boolean;
  textColor: string;
  inputBackgroundColor: string;
}>`
  background: ${({ inputBackgroundColor }) => inputBackgroundColor};
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(5px);
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1rem;
  padding-block: 0.5rem;
  color: inherit;
  text-align: center;
  position: relative;

  ::placeholder {
    color: inherit;
  }
`;
