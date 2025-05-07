import { useLocation } from "react-router-dom";

const useCurrentPath = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  // Query Search Params
  const queryParams = new URLSearchParams(location.search);
  const queryParamsObject: Record<string, string> = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  return {
    pathSegments,
    queryParams: queryParamsObject,
  };
};

export default useCurrentPath;
