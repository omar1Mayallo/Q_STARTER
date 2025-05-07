import ActionsConfig from "../actions";
import useUserActions from "./useUserActions";

const useFactoryActions = (
  handlers: {
    [key: string]: (id: number) => void;
  },
  entityName: string,
) => {
  const { userActions, isHaveNotDeleteAction } = useUserActions(entityName);

  const actionsItems = userActions
    ?.map((actionKey) => {
      const actionConfig = ActionsConfig[actionKey];
      if (handlers[actionKey]) {
        return {
          ...actionConfig,
          handler: handlers[actionKey],
        };
      }
      return null;
    })
    .filter((action) => action !== null);
  return { actionsItems, isHaveNotDeleteAction };
};

export default useFactoryActions;
