import styled from "styled-components";
import { useContext } from "react";
import { appContext } from "../components/providers/appProvider";
import Head from "../components/styled/head";
import PageWrap from "../components/styled/pageWrap";
import DisplayText from "../components/styled/displayText";
import Category from "../components/projects/custome/category";
import AccountOptions from "../components/options/accountOptions";
import PersonalisationOptions from "../components/options/personalisationOptions";
import DangerZone from "../components/options/dangerZone";
interface OptionsProps {}
interface StyleProps {}
const Options: React.FC<OptionsProps> = (props) => {
  return (
    <PageWrap>
      <Head>
        <DisplayText>Settings</DisplayText>
      </Head>
      <Body>
        <Category name="Account">
          <AccountOptions />
        </Category>
        <Category name="Personalization">
          <PersonalisationOptions />
        </Category>
        <Category name="Danger Zone">
          <DangerZone />
        </Category>
      </Body>
    </PageWrap>
  );
};
export default Options;
const Body = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
