import { BaseModel } from "./Base.model";

export enum USER_TYPE {
  ADMINISTRATIVE = "ADMINISTRATIVE",
  PORTAL = "PORTAL",
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserModel extends BaseModel {
  username: string;

  email: string;

  password: string;

  status: USER_STATUS;

  type: USER_TYPE;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatar?: any;

  deleted_at?: Date;
}
