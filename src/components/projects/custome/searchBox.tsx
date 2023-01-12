import styled from "styled-components";
import { Loop } from "../../utils/icons";

interface SearchBoxProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder?: string;
}
const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  value,
  placeholder = "search...",
}) => {
  return (
    <ComponentBody>
      <SearchBoxImg src={Loop} alt="search Icon"></SearchBoxImg>
      <SearchBoxInput
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      ></SearchBoxInput>
    </ComponentBody>
  );
};
export default SearchBox;
const ComponentBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  max-width: 50%;
  height: 100%;
`;
const SearchBoxInput = styled.input`
  background-color: transparent;
  border: none;
  /* padding-left: 10px; */
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: #414141;
    font-weight: 600;
  }
`;
const SearchBoxImg = styled.img.attrs(() => ({ draggable: false }))`
  height: 1rem;
  width: 1rem;
  padding: 0 4%;
`;
