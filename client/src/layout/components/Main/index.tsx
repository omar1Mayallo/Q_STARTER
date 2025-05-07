import { styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLangStyle } from "../../../shared/hooks/useStyle";

const StyledMain = styled("main")<{ direction: "rtl" | "ltr" }>`
  height: 100%;
  flex: 1;
  overflow: auto;
  padding: 25px;
  border: 1px solid rgba(000, 000, 000, 0.3);
  direction: ${(props) => props.direction};
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StyledMain direction={useLangStyle("rtl", "ltr")}>{children}</StyledMain>
  );
};
