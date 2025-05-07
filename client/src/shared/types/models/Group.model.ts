import { BaseModel } from "./Base.model";

export enum GROUP_TYPE {
  ADMINISTRATIVE = "ADMINISTRATIVE",
  PORTAL = "PORTAL",
}

export enum GROUP_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface GroupModel extends BaseModel {
  name: string;

  description: string;

  status: GROUP_STATUS;

  type: GROUP_TYPE;
}
