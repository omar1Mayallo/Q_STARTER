import { useLocation, useNavigate } from "react-router-dom";
import useCurrentPath from "../../layout/components/SideDrawer/hooks/useCurrentPath";

const useCommonActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { queryParams } = useCurrentPath();
  const handleResetAction = () => {
    navigate({ pathname: location.pathname, search: "" });
  };
  return {
    handleResetAction,
    queryParams,
  };
};

export default useCommonActions;
