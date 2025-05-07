import { useState } from "react";
import { PermissionsTreeI } from "../../types";

const usePermissionTreeHandlers = (
  systemPermissions: PermissionsTreeI,
  userActions: string[] = [],
) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(userActions);

  const handleModuleChange = (moduleKey: string, isChecked: boolean) => {
    let updatedCheckedItems = [...checkedItems];
    systemPermissions.forEach((module) => {
      if (module.module_key === moduleKey) {
        module.entities.forEach((entity) => {
          entity.actions.forEach((action) => {
            if (isChecked) {
              if (!updatedCheckedItems.includes(action.action_key)) {
                updatedCheckedItems.push(action.action_key);
              }
            } else {
              updatedCheckedItems = updatedCheckedItems.filter(
                (item) => item !== action.action_key,
              );
            }
          });
        });
      }
    });
    setCheckedItems(updatedCheckedItems);
  };

  const handleEntityChange = (
    moduleKey: string,
    entityKey: string,
    isChecked: boolean,
  ) => {
    let updatedCheckedItems = [...checkedItems];
    systemPermissions.forEach((module) => {
      if (module.module_key === moduleKey) {
        module.entities.forEach((entity) => {
          if (entity.entity_key === entityKey) {
            entity.actions.forEach((action) => {
              if (isChecked) {
                if (!updatedCheckedItems.includes(action.action_key)) {
                  updatedCheckedItems.push(action.action_key);
                }
              } else {
                updatedCheckedItems = updatedCheckedItems.filter(
                  (item) => item !== action.action_key,
                );
              }
            });
          }
        });
      }
    });
    setCheckedItems(updatedCheckedItems);
  };

  const handleActionChange = (
    actionKey: string,
    entityKey: string,
    moduleKey: string,
    isChecked: boolean,
  ) => {
    let updatedCheckedItems = [...checkedItems];
    const currentEntity = systemPermissions
      .find((module) => module.module_key === moduleKey)
      ?.entities.find((entity) => entity.entity_key === entityKey);

    if (isChecked) {
      if (!updatedCheckedItems.includes(actionKey)) {
        updatedCheckedItems.push(actionKey);
      }
      const readAction = currentEntity?.actions.find(
        (action) => action.action_category === "READ",
      );
      if (readAction && !updatedCheckedItems.includes(readAction.action_key)) {
        updatedCheckedItems.push(readAction.action_key);
      }
    } else {
      const isOtherActionsChecked = currentEntity?.actions.some(
        (action) =>
          action.action_key !== actionKey &&
          action.action_category !== "READ" &&
          updatedCheckedItems.includes(action.action_key),
      );

      if (isOtherActionsChecked) {
        if (
          !currentEntity?.actions.find(
            (action) =>
              action.action_key === actionKey &&
              action.action_category === "READ",
          )
        ) {
          updatedCheckedItems = updatedCheckedItems.filter(
            (item) => item !== actionKey,
          );
        }
      } else {
        updatedCheckedItems = updatedCheckedItems.filter(
          (item) => item !== actionKey,
        );
      }
    }
    setCheckedItems(updatedCheckedItems);
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    const updatedCheckedItems: string[] = [];
    if (isChecked) {
      systemPermissions.forEach((module) => {
        module.entities.forEach((entity) => {
          entity.actions.forEach((action) => {
            if (!updatedCheckedItems.includes(action.action_key)) {
              updatedCheckedItems.push(action.action_key);
            }
          });
        });
      });
    }
    setCheckedItems(updatedCheckedItems);
  };

  const handleViewOnlyChange = (isChecked: boolean) => {
    const updatedCheckedItems: string[] = [];
    if (isChecked) {
      systemPermissions.forEach((module) => {
        module.entities.forEach((entity) => {
          entity.actions.forEach((action) => {
            if (
              action.action_category === "READ" &&
              !updatedCheckedItems.includes(action.action_key)
            ) {
              updatedCheckedItems.push(action.action_key);
            }
          });
        });
      });
    }
    setCheckedItems(updatedCheckedItems);
  };

  const isModuleChecked = (moduleKey: string) => {
    let isChecked = true;
    systemPermissions.forEach((module) => {
      if (module.module_key === moduleKey) {
        module.entities.forEach((entity) => {
          entity.actions.forEach((action) => {
            if (!checkedItems.includes(action.action_key)) {
              isChecked = false;
            }
          });
        });
      }
    });
    return isChecked;
  };

  const isEntityChecked = (entityKey: string) => {
    let isChecked = true;
    systemPermissions.forEach((module) => {
      module.entities.forEach((entity) => {
        if (entity.entity_key === entityKey) {
          entity.actions.forEach((action) => {
            if (!checkedItems.includes(action.action_key)) {
              isChecked = false;
            }
          });
        }
      });
    });
    return isChecked;
  };

  const isAllChecked = () => {
    let isChecked = true;
    systemPermissions.forEach((module) => {
      module.entities.forEach((entity) => {
        entity.actions.forEach((action) => {
          if (!checkedItems.includes(action.action_key)) {
            isChecked = false;
          }
        });
      });
    });
    return isChecked;
  };

  const isViewOnlyChecked = () => {
    let isChecked = true;
    systemPermissions.forEach((module) => {
      module.entities.forEach((entity) => {
        entity.actions.forEach((action) => {
          if (
            action.action_category === "READ" &&
            !checkedItems.includes(action.action_key)
          ) {
            isChecked = false;
          }
        });
      });
    });
    return isChecked;
  };

  return {
    checkedItems,
    handleModuleChange,
    handleEntityChange,
    handleActionChange,
    handleSelectAllChange,
    handleViewOnlyChange,
    isModuleChecked,
    isEntityChecked,
    isAllChecked,
    isViewOnlyChecked,
  };
};

export default usePermissionTreeHandlers;
