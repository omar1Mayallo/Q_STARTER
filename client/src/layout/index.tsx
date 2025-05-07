import { Box, Toolbar, styled } from "@mui/material";
import { ReactNode } from "react";
import Header from "./components/Header";
import { Main } from "./components/Main";
import SideDrawer from "./components/SideDrawer";
import { useLangStyle } from "../shared/hooks/useStyle";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <OuterContainer>
      <Header />
      <Toolbar />
      <InnerContainer flexDirection={useLangStyle("row-reverse", "row")}>
        <SideDrawer />
        <Main>{children}</Main>
      </InnerContainer>
      {/* <Footer /> */}
    </OuterContainer>
  );
};

export default BaseLayout;

const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled(Box)`
  display: flex;
  ${({ flexDirection }) => `flex-direction: ${flexDirection};`}
  flex: 1;
  overflow: hidden;
  height: inherit;
`;
