import styled from "styled-components";
import Glass from "../../styled/glass";
import add from "../../../Icons/Add.svg";
import { addProject } from "../../../API/handleDocs";
interface SearchBoxProps {
  search: { value: string; set: React.Dispatch<React.SetStateAction<string>> };
}
const SearchBox: React.FC<SearchBoxProps> = ({ search }) => {
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.set(e.target.value);
  };
  return (
    <Glass size="inline" direction="row">
      <SearchInput
        value={search.value}
        onChange={(e) => setText(e)}
        placeholder="search..."
      ></SearchInput>
      <AddNewProject
        src={add}
        alt="add new Project"
        onClick={() => addProject("kru")}
      ></AddNewProject>
    </Glass>
  );
};
export default SearchBox;
const SearchInput = styled.input``;
const AddNewProject = styled.img``;
