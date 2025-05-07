import { BaseModel } from "./Base.model";

export enum ROLE_TYPE {
  ADMINISTRATIVE = "ADMINISTRATIVE",
  PORTAL = "PORTAL",
}

export enum ROLE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface RoleModel extends BaseModel {
  name: string;

  description: string;

  status: ROLE_STATUS;

  type: ROLE_TYPE;
}
