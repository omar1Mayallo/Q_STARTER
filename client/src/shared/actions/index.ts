import {
  AssignmentInd,
  Delete,
  Edit,
  GroupAdd,
  LockPerson,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export interface IActionsConfig {
  actionName: string;
  Icon: typeof SvgIcon;
}

const ActionsConfig: Record<string, IActionsConfig> = {
  update: {
    actionName: "edit",
    Icon: Edit,
  },
  delete: {
    actionName: "delete",
    Icon: Delete,
  },
  permissions: {
    actionName: "user_permissions",
    Icon: LockPerson,
  },
  "assign-role": {
    actionName: "assign_role",
    Icon: AssignmentInd,
  },
  "add-users": {
    actionName: "add_user",
    Icon: GroupAdd,
  },
};

export default ActionsConfig;
