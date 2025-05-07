import { Error } from "@mui/icons-material";
import { Avatar, IconButton, Skeleton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import ErrorTooltip from "../../../../../shared/components/Tooltips/ErrorTooltip";
import LoadingTooltip from "../../../../../shared/components/Tooltips/LoadingTooltip";
import { UserModel } from "../../../../../shared/types/models/User.model";
import { Buffer } from "buffer";

export interface UserIconI {
  userData?: UserModel;
  isLoading: boolean;
  isError: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserIcon = ({ userData, isLoading, isError, handleClick }: UserIconI) => {
  const { t } = useTranslation(["layout"]);

  if (isLoading)
    return (
      <LoadingTooltip title={t("USER_LOADING")}>
        <IconButton onClick={handleClick} size="small">
          <Skeleton variant="circular" height={32} width={32} />
        </IconButton>
      </LoadingTooltip>
    );

  if (isError)
    return (
      <ErrorTooltip title={t("GETTING_USER_ERROR")} sx={{ color: "red" }}>
        <IconButton onClick={handleClick} size="small">
          <Error color="error" />
        </IconButton>
      </ErrorTooltip>
    );

  if (userData) {
    return (
      <Tooltip title={t("ACCOUNT_SETTINGS")}>
        <IconButton onClick={handleClick} size="small">
          {userData.avatar ? (
            <Avatar
              alt="User Avatar"
              src={`data:image/png;base64,${Buffer.from(userData.avatar).toString("base64")}`}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <Avatar
              sx={{
                width: 32,
                height: 32,
              }}
            >
              {userData?.username.slice(0, 1).charAt(0).toUpperCase()}
            </Avatar>
          )}
        </IconButton>
      </Tooltip>
    );
  }
};

export default UserIcon;
