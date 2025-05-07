import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserActions from "../../hooks/useUserActions";

const withPageGuard = (
  Component: React.ComponentType,
  entity: string,
  action: string = "list",
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const { userActions } = useUserActions(entity);
    const navigate = useNavigate();

    useEffect(() => {
      if (userActions && !userActions.includes(action)) {
        return navigate("/unauthorized");
      }
    }, [userActions, navigate]);

    if (!userActions || !userActions.includes(action)) {
      return null; // !More Suitable is CenteredLayout Contain Spinner
    }

    return <Component {...props} />;
  };
};

export default withPageGuard;
