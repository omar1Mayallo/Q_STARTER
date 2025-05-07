import { STATUS, USER_TYPE } from '../enums';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  username: string;

  email: string;

  password: string;

  status: STATUS;

  type: USER_TYPE;

  deletedAt?: Date;
}

export class UserActionsModel extends BaseModel {
  email: string;

  action_key: string;
}

export class RoleModel extends BaseModel {
  name: string;

  description?: string;

  status: STATUS;

  type: USER_TYPE;
}

export class RoleActionsModel extends BaseModel {
  role_id: number;

  action_key: string;
}

export class UserRoleModel extends BaseModel {
  user_id: number;

  role_id: number;
}

export class GroupModel extends BaseModel {
  name: string;

  description?: string;

  status: STATUS;
}
