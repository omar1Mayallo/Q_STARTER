import { useQueryClient } from "@tanstack/react-query";
import CACHED_KEYS from "../constants/query-cached-keys";

const useUserActions = (entityName?: string) => {
  const queryClient = useQueryClient();
  const actions = queryClient.getQueryData<string[]>([
    CACHED_KEYS.LOGGED_USER_ACTIONS,
  ]);

  let userActions: string[] | undefined;
  let tableActions: string[] | undefined;

  if (entityName) {
    userActions = actions
      ?.filter((item) => item.startsWith(`${entityName}/`))
      ?.map((item) => item.split("/")[1]);
    tableActions = userActions?.filter((action) => action !== "list");
  } else {
    userActions = actions;
  }

  const isHaveNotDeleteAction = !userActions?.includes("delete");

  return { userActions, tableActions, isHaveNotDeleteAction };
};

export default useUserActions;
