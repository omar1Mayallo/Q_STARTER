import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { CustomHelpersService } from 'src/shared/modules/custom-helpers/custom-helpers.service';
import {
  RoleActionsModel,
  UserActionsModel,
} from 'src/shared/types/entities/user-management.model';
import { USER_TYPE } from 'src/shared/types/enums';
import { TABLES } from './../../../../../shared/constants/tables';
import {
  EntityProps,
  IPermission,
  ModuleProps,
} from './types/permissions.types';
import { UserService } from '../user/user.service';
import { RoleService } from '../../role-manager/role/role.service';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly helpers: CustomHelpersService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async getLoggedUserPermissions(email: string, type: USER_TYPE) {
    const { MODULE } = TABLES;
    const userPermissions = await this.getPermissionsByEmail(email);
    const baseModule: Pick<IPermission, ModuleProps> = await this.knex
      .from(MODULE)
      .select({
        module_key: `${MODULE}.module_key`,
        module_ar_name: `${MODULE}.ar_name`,
        module_en_name: `${MODULE}.en_name`,
        module_parent_key: `${MODULE}.parent_key`,
        module_source: `${MODULE}.source`,
      })
      .where({ source: type })
      .first();
    if (this.helpers.isEmpty(userPermissions)) {
      throw new UnauthorizedException("User don't have permissions");
    }
    return this.buildPermissionsTree(userPermissions, baseModule);
  }

  async getLoggedUserActions(email: string) {
    const userActions = await this.knex<UserActionsModel>(
      TABLES.USER_ENTITY_ACTION,
    )
      .where({ email })
      .select('action_key')
      .pluck('action_key');

    return userActions;
  }

  async getUserActionByUserId(id: number) {
    const user = await this.userService.getUser(id);
    const actions = await this.getLoggedUserActions(user.email);

    return actions;
  }

  async getRoleActionByRoleId(id: number) {
    const role = await this.roleService.getRole(id);

    const actions = await this.knex<RoleActionsModel>(
      TABLES.ROLE_ENTITY_ACTIONS,
    )
      .where({ role_id: role.id })
      .select('action_key')
      .pluck('action_key');

    return actions;
  }

  async verifyPermissions(
    email: string,
    action: string | string[],
  ): Promise<boolean> {
    // 1) Get Current User Permissions (or Actions)
    const userActions = await this.getLoggedUserActions(email);

    // 2) verify action(s) in User Permissions
    if (Array.isArray(action)) {
      // 2-1) action as [act-1, act-2, act-3] .. check at least one in userActions
      return userActions.some((userAction: string) =>
        action.includes(userAction),
      );
    }
    // 2-2) action as act-1 .. check it exists in userActions
    else return userActions.includes(action);
  }

  async getSystemPermissions(origin: USER_TYPE) {
    const { MODULE, ENTITY, ENTITY_ACTION } = TABLES;
    const systemPermissions = await this.knex
      .select({
        module_key: `${MODULE}.module_key`,
        module_ar_name: `${MODULE}.ar_name`,
        module_en_name: `${MODULE}.en_name`,
        module_parent_key: `${MODULE}.parent_key`,
        module_source: `${MODULE}.source`,
        entity_key: `${ENTITY}.entity_key`,
        entity_module_parent_key: `${ENTITY}.module_key`,
        entity_ar_name: `${ENTITY}.ar_name`,
        entity_en_name: `${ENTITY}.en_name`,
        action_key: `${ENTITY_ACTION}.action_key`,
        action_ar_name: `${ENTITY_ACTION}.action_ar_name`,
        action_en_name: `${ENTITY_ACTION}.action_en_name`,
        action_category: `${ENTITY_ACTION}.action_category`,
      })
      .from(ENTITY_ACTION)
      .join(ENTITY, `${ENTITY_ACTION}.entity_key`, `${ENTITY}.entity_key`)
      .join(MODULE, `${ENTITY}.module_key`, `${MODULE}.module_key`)
      .where({
        [`${MODULE}.source`]: origin,
      });

    const moduleMap = new Map();

    systemPermissions.forEach((permission) => {
      const {
        module_key,
        module_ar_name,
        module_en_name,
        module_parent_key,
        module_source,
        entity_key,
        entity_module_parent_key,
        entity_ar_name,
        entity_en_name,
        action_key,
        action_ar_name,
        action_en_name,
        action_category,
      } = permission;

      if (!moduleMap.has(module_key)) {
        moduleMap.set(module_key, {
          module_key,
          module_ar_name,
          module_en_name,
          module_parent_key,
          module_source,
          entities: new Map(),
        });
      }

      const module = moduleMap.get(module_key);

      if (!module.entities.has(entity_key)) {
        module.entities.set(entity_key, {
          entity_key,
          entity_module_parent_key,
          entity_ar_name,
          entity_en_name,
          actions: [],
        });
      }

      const entity = module.entities.get(entity_key);
      entity.actions.push({
        action_key,
        action_ar_name,
        action_en_name,
        action_category,
      });
    });

    const tree = [];

    moduleMap.forEach((module) => {
      const entities = [];
      module.entities.forEach((entity) => {
        entities.push(entity);
      });
      module.entities = entities;
      tree.push(module);
    });

    return tree;
  }

  // ____________________ PRIVATE ____________________ //
  private async getPermissionsByEmail(email: string): Promise<IPermission[]> {
    const { MODULE, ENTITY, ENTITY_ACTION, USER_ENTITY_ACTION } = TABLES;
    const userPermissions: IPermission[] = await this.knex
      .select({
        module_key: `${MODULE}.module_key`,
        module_ar_name: `${MODULE}.ar_name`,
        module_en_name: `${MODULE}.en_name`,
        module_parent_key: `${MODULE}.parent_key`,
        module_source: `${MODULE}.source`,
        module_icon: `${MODULE}.icon`,
        entity_key: `${ENTITY}.entity_key`,
        entity_module_parent_key: `${ENTITY}.module_key`,
        entity_ar_name: `${ENTITY}.ar_name`,
        entity_en_name: `${ENTITY}.en_name`,
        entity_url: `${ENTITY}.entity_url`,
        entity_icon: `${ENTITY}.icon`,
        order: `${ENTITY}.order`,
        action_key: `${ENTITY_ACTION}.action_key`,
      })
      .from(USER_ENTITY_ACTION)
      .join(
        ENTITY_ACTION,
        `${USER_ENTITY_ACTION}.action_key`,
        `${TABLES.ENTITY_ACTION}.action_key`,
      )
      .join(
        ENTITY,
        `${TABLES.ENTITY_ACTION}.entity_key`,
        `${ENTITY}.entity_key`,
      )
      .join(MODULE, `${ENTITY}.module_key`, `${MODULE}.module_key`)
      .where({
        [`${USER_ENTITY_ACTION}.email`]: email,
      })
      .orderBy(`${ENTITY}.order`, 'asc');

    return userPermissions;
  }

  private buildPermissionsTree(
    permissions: IPermission[],
    baseModule: Pick<IPermission, ModuleProps>,
  ) {
    // 1) Prepare Modules, Entities and Actions Properties
    const {
      groupedActions,
      populateEntityProperties,
      populateModuleProperties,
    } = this.prepareProperties(permissions);

    // 2) Split Modules and Entities
    // ______________MAIN_MODULE__________________ //
    const mainModule = baseModule;

    //_____________ ([1st]_LEVEL)_ENTITIES_&_MODULES _____________//
    const firstLevelEntities = this.aggregateEntitiesFromModule(undefined, {
      permissions,
      mainModule,
    });
    const {
      subModules: firstLevelSubModules,
      aggregatedSubModules: firstLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      undefined,
      mainModule,
    );

    //_____________ ([2nd]_LEVEL)_ENTITIES_&_MODULES _____________//
    const secondLevelEntities =
      this.aggregateEntitiesFromModule(firstLevelSubModules);

    const {
      subModules: secondLevelSubModules,
      aggregatedSubModules: secondLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      firstLevelAggregatedSubModules,
    );

    //_____________ ([3rd]_LEVEL)_ENTITIES_&_MODULES _____________//
    const thirdLevelEntities = this.aggregateEntitiesFromModule(
      secondLevelSubModules,
    );
    const {
      subModules: thirdLevelSubModules,
      aggregatedSubModules: thirdLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      secondLevelAggregatedSubModules,
    );

    //_____________ ([4th]_LEVEL)_ENTITIES_&_MODULES _____________//
    const forthLevelEntities =
      this.aggregateEntitiesFromModule(thirdLevelSubModules);

    // 2) Constructing Permission Tree Structure
    const permissionsTree = {
      ...populateModuleProperties(mainModule),
      entities: [
        ...firstLevelEntities.map((entity) => {
          return {
            ...populateEntityProperties(entity),
            actions: groupedActions[entity.entity_key] || [],
          };
        }),
        ...firstLevelAggregatedSubModules.map((subModule) => {
          return {
            ...populateModuleProperties(subModule),
            order: secondLevelEntities.filter(
              (entity) =>
                entity.entity_module_parent_key === subModule.module_key,
            )[0].order,
            entities: [
              ...secondLevelEntities
                .filter(
                  (entity) =>
                    entity.entity_module_parent_key === subModule.module_key,
                )
                .map((entity) => {
                  return {
                    ...populateEntityProperties(entity),
                    actions: groupedActions[entity.entity_key] || [],
                  };
                }),
              ...secondLevelAggregatedSubModules
                .filter(
                  (item) => item.module_parent_key === subModule.module_key,
                )
                .map((subModule) => {
                  return {
                    ...populateModuleProperties(subModule),
                    order: thirdLevelEntities.filter(
                      (entity) =>
                        entity.entity_module_parent_key ===
                        subModule.module_key,
                    )[0].order,
                    entities: [
                      ...thirdLevelEntities
                        .filter(
                          (entity) =>
                            entity.entity_module_parent_key ===
                            subModule.module_key,
                        )
                        .map((entity) => {
                          return {
                            ...populateEntityProperties(entity),
                            actions: groupedActions[entity.entity_key] || [],
                          };
                        }),
                      ...thirdLevelAggregatedSubModules
                        .filter(
                          (item) =>
                            item.module_parent_key === subModule.module_key,
                        )
                        .map((subModule) => {
                          return {
                            ...populateModuleProperties(subModule),
                            order: forthLevelEntities.filter(
                              (entity) =>
                                entity.entity_module_parent_key ===
                                subModule.module_key,
                            )[0].order,
                            entities: [
                              ...forthLevelEntities
                                .filter(
                                  (entity) =>
                                    entity.entity_module_parent_key ===
                                    subModule.module_key,
                                )
                                .map((entity) => {
                                  return {
                                    ...populateEntityProperties(entity),
                                    actions:
                                      groupedActions[entity.entity_key] || [],
                                  };
                                }),
                            ],
                          };
                        }),
                    ],
                  };
                }),
            ],
          };
        }),
      ].sort((a, b) => a.order - b.order),
    };

    return permissionsTree;
  }

  private prepareProperties(permissions?: IPermission[]) {
    //_MODULE
    const populateModuleProperties = (
      module: Pick<IPermission, ModuleProps>,
    ) => ({
      module_key: module.module_key,
      module_ar_name: module.module_ar_name,
      module_en_name: module.module_en_name,
      module_parent_key: module.module_parent_key,
      module_source: module.module_source,
      module_icon: module.module_icon,
    });

    //_ENTITY
    const populateEntityProperties = (
      entity: Pick<IPermission, EntityProps>,
    ) => ({
      entity_key: entity.entity_key,
      entity_module_parent_key: entity.entity_module_parent_key,
      entity_ar_name: entity.entity_ar_name,
      entity_en_name: entity.entity_en_name,
      entity_url: entity.entity_url,
      entity_icon: entity.entity_icon,
      order: entity.order,
    });

    //_ACTION
    const groupedActions = {};
    permissions?.forEach((permission) => {
      const { entity_key, action_key } = permission;
      if (!groupedActions[entity_key]) {
        groupedActions[entity_key] = [];
      }
      if (action_key) {
        groupedActions[entity_key].push({
          action_key,
        });
      }
    });

    return {
      groupedActions,
      populateModuleProperties,
      populateEntityProperties,
    };
  }

  private aggregateEntitiesFromModule(
    nestedModules?: IPermission[],
    forMainModule?: {
      permissions: IPermission[];
      mainModule: Pick<IPermission, ModuleProps>;
    },
  ) {
    // Modules Entities (for the main module and nested modules)
    let entities: IPermission[] = [];
    if (forMainModule) {
      entities = forMainModule.permissions.filter(
        (item) =>
          item.entity_module_parent_key === forMainModule.mainModule.module_key,
      );
    } else {
      entities = nestedModules.filter(
        (item) => item.entity_module_parent_key === item.module_key,
      );
    }

    // Uniqueness the entities keys
    const uniqueEntitiesKeys = [
      ...new Set(entities.map((item) => item.entity_key)),
    ];

    // Aggregate Entities
    const aggregatedEntities = uniqueEntitiesKeys.map((entityKey) => {
      const entity = entities.find((item) => item.entity_key === entityKey);
      return this.prepareProperties().populateEntityProperties(entity);
    });

    return aggregatedEntities;
  }

  private aggregateSubModulesFromParentModule(
    permissions: IPermission[],
    aggregatedParentModules?: Pick<IPermission, ModuleProps>[],
    mainModule?: Pick<IPermission, ModuleProps>,
  ) {
    let subModules: IPermission[] = [];
    if (mainModule) {
      subModules = permissions.filter(
        (item) => item.module_parent_key === mainModule.module_key,
      );
    } else {
      subModules = permissions.filter((item) =>
        aggregatedParentModules.some(
          (aggregatedItem) =>
            aggregatedItem.module_key === item.module_parent_key,
        ),
      );
    }

    const uniqueSubModuleKeys = [
      ...new Set(subModules.map((item) => item.module_key)),
    ];
    const aggregatedSubModules = uniqueSubModuleKeys.map((moduleKey) => {
      const module = subModules.find((item) => item.module_key === moduleKey);
      return this.prepareProperties().populateModuleProperties(module);
    });

    return { subModules, aggregatedSubModules };
  }
}
