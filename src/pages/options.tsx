import styled from "styled-components";
import { useContext, useEffect } from "react";
import Head from "../components/custom/head";
import PageWrap from "../components/styled/components/pageWrap";
import DisplayText from "../components/styled/components/displayText";
import Category from "../components/custom/category";
import AccountOptions from "../components/options/accountOptions";
import PersonalisationOptions from "../components/options/personalisationOptions";
import DangerZone from "../components/options/dangerZone";
const Options: React.FC = () => {
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
