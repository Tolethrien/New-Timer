import styled from "styled-components";
interface TestProps {}
interface StyleProps {}
const Test: React.FC<TestProps> = (props) => {
  return <Wrap>Test</Wrap>;
};
export default Test;
const Wrap = styled.div<StyleProps>``;
