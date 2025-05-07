import { Fragment, ReactNode } from "react";
import { NavLink } from "react-router-dom";

const ConditionalNavLinkWrapper = ({
  url,
  children,
}: {
  url?: string;
  children: ReactNode;
}) => {
  return url ? (
    <NavLink to={url}>{children}</NavLink>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default ConditionalNavLinkWrapper;
