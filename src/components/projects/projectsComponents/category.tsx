import styled from "styled-components";
const Category: React.FC<{
  name: string;
  hue: number;
  children?: React.ReactNode;
}> = ({ name, hue, children }) => {
  return (
    <CategoryType name={name} hue={hue}>
      <TaskWrapper>{children}</TaskWrapper>
    </CategoryType>
  );
};
export default Category;

const CategoryType = styled.div<{ name: string; hue: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: 1%;
  position: relative;
  height: fit-content;
  margin-bottom: 2rem;

  :before {
    //donw
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    top: 0;
    height: calc(100% + 1rem);
    width: 5%;
    background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
    border-radius: 5px;
  }
  :after {
    //side
    content: "${({ name }) => name}";
    position: absolute;
    color: black;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    height: 1.75rem;
    width: 30%;
    background-color: ${({ hue }) => `hsla(${hue}, 85%, 85%, 1)`};
    border-radius: 5px;
  }
`;

const TaskWrapper = styled.div`
  width: 94%;
  z-index: 2;
  margin-top: 1.75rem;
`;
