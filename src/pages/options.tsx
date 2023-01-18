import styled from "styled-components";
import Glass from "../components/styled/glass";
import Option from "../components/options/optionBar";
import { logout } from "../API/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../components/providers/appProvider";
import Head from "../components/styled/head";
import PageWrap from "../components/styled/pageWrap";
import DisplayText from "../components/styled/displayText";
import Category from "../components/projects/custome/category";
import ButtonWithIcon from "../components/custom/buttonWithIcon";
import { Logout, RoundSwap } from "../components/utils/icons";
import AccountOptions from "../components/options/accountOptions";
import PersonalisationOptions from "../components/options/personalisationOptions";
import DangerZone from "../components/options/dangerZone";
interface OptionsProps {}
interface StyleProps {}
const Options: React.FC<OptionsProps> = (props) => {
  // if (!currentUser) return <Navigate to="/login" replace />;
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
const Name = styled.h3<StyleProps>`
  padding-top: 2%;
  font-size: 1.3em;
`;
const Button = styled.div<StyleProps>`
  width: 10%;
  height: 30%;
  color: white;
`;
