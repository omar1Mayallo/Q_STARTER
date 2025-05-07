import { ValueOf } from '../types/custom';

export const TABLES = {
  USERS: 'user',
  ROLES: 'role',
  USER_ROLES: 'users_roles',
  GROUP: 'group',
  GROUP_USERS: 'group_users',
  GROUP_ROLES: 'group_role',
  MODULE: 'modules',
  ENTITY: 'entities',
  ENTITY_ACTION: 'entities_actions',
  USER_ENTITY_ACTION: 'user_entity_actions',
  ROLE_ENTITY_ACTIONS: 'role_entity_actions',
} as const;

export type TableKeys = ValueOf<typeof TABLES>;

export enum ActionCategory {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
