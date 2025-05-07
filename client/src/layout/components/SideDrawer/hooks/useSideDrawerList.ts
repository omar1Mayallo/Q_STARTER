/* eslint-disable @typescript-eslint/no-explicit-any */
import { IS_END_LIST_REGEX } from "../../../../shared/constants/regex";
import useUserStore from "../../../../store/user.store";

export const getMenuItems = (entities: any[]) => {
  const list: any[] = [];
  entities.forEach((entity: any) => {
    // Direct Entity
    if (entity.entity_url) {
      const hasListAction = entity.actions?.find((item: any) =>
        IS_END_LIST_REGEX.test(item.action_key),
      );
      // Just Add One That have action_key ".../list"
      if (hasListAction) {
        list.push({
          name: {
            en: entity.entity_en_name,
            ar: entity.entity_ar_name,
          },
          url: `/${entity.entity_url}`,
          Icon: entity.entity_icon,
          entity_key: entity.entity_key,
        });
      }
    }
    // Direct Modules That have Child Modules or Entities
    else if (entity.entities && entity.entities.length > 0) {
      list.push({
        name: {
          en: entity.module_en_name,
          ar: entity.module_ar_name,
        },
        module_key: entity.module_key,
        Icon: entity.module_icon || "Square",
        // url be the entity_url of the entity the first entity has the action_key ".../list"
        url: entity.entities.find((item: any) =>
          item.actions?.find((item: any) =>
            IS_END_LIST_REGEX.test(item.action_key),
          ),
        )?.entity_url,
        subItemsMenu: getMenuItems(entity.entities),
      });
    }
  });
  return list;
};

const useSideMenuList = () => {
  const permissions = useUserStore((s) => s.userPermissions);

  const sideMenuList = getMenuItems(permissions.entities);

  return { sideMenuList };
};

export default useSideMenuList;
