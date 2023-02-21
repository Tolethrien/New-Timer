import styled, { css } from "styled-components";
import Head from "../components/custom/head";
import PageWrap from "../components/styled/components/pageWrap";
import DisplayText from "../components/styled/components/displayText";
import Category from "../components/custom/category";
import AccountOptions from "../components/options/accountOptions";
import PersonalisationOptions from "../components/options/personalisationOptions";
import DangerZone from "../components/options/dangerZone";
import useTheme from "../components/hooks/useTheme";
import useIsOnline from "../components/hooks/useIsOnline";
import { pulse } from "../components/styled/animations/pulse";
const Options: React.FC = () => {
  const {
    getColor: {
      categoryDanger,
      ConnectionDotIndicatorColorTone,
      ConnectionDotIndicatorOfflineColorTone,
    },
  } = useTheme();
  const isOnline = useIsOnline();

  return (
    <PageWrap>
      <Head extendedStyle={ExtendedHead}>
        <DisplayText size={1.5}>Settings</DisplayText>
        <ConnectionIndicator
          DotColor={
            isOnline
              ? ConnectionDotIndicatorColorTone
              : ConnectionDotIndicatorOfflineColorTone
          }
          isOnline={isOnline}
        >
          {isOnline ? "Online" : "Offline"}
        </ConnectionIndicator>
      </Head>
      <Body>
        <Category name="Account">
          <AccountOptions />
        </Category>
        <Category name="Personalization">
          <PersonalisationOptions />
        </Category>
        <Category name="Danger Zone" overrideColor={categoryDanger}>
          <DangerZone />
        </Category>
      </Body>
    </PageWrap>
  );
};
export default Options;
const Body = styled.div`
  padding-top: 1rem;
  width: 100%;
  overflow-y: auto;
`;
const ExtendedHead = styled.div`
  flex-direction: row;
`;
const ConnectionIndicator = styled.div<{ DotColor: string; isOnline: boolean }>`
  position: relative;
  top: 0;
  transform: translateY(50%);
  box-sizing: border-box;
  :after {
    content: "";
    position: absolute;
    top: -100%;
    right: 50%;
    transform: translate(50%, 20%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    animation: ${({ DotColor }) =>
      css`
        ${pulse(DotColor)} 3s infinite alternate
      `};
  }
`;
