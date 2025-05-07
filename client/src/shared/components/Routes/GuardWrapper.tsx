import React, { ReactNode } from "react";
import useUserActions from "../../hooks/useUserActions";

interface GuardWrapperProps {
  entity: string;
  action: string;
  children: ReactNode;
}

const GuardWrapper: React.FC<GuardWrapperProps> = ({
  entity,
  action,
  children,
}) => {
  const { userActions } = useUserActions(entity);

  return <>{userActions?.includes(action) && children}</>;
};

export default GuardWrapper;
