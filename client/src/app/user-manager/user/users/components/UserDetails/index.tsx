import { Alert, Box, Paper } from "@mui/material";
import i18next from "i18next";
import { useParams } from "react-router-dom";
import PageBreadcrumbs from "../../../../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import BackButton from "../../../../../../shared/components/Buttons/BackButton";
import PageHead from "../../../../../../shared/components/Head/PageHead";
import FormSkeleton from "../../../../../../shared/components/Loaders/FormSkeleton";
import { userDetailsBreadcrumbs } from "../../data";
import useGetUser from "../../services/getOne";
import UserFormForEdit from "./UserFormForEdit";
import withPageGuard from "../../../../../../shared/components/Routes/withPageGuard";
import { useGetUserActionsById } from "../../../../permissions/services/permissions.service";

const UserDetails = () => {
  const { id } = useParams();

  const { data: userActions, ...restUserActions } = useGetUserActionsById(+id!);
  const { data: userData, ...restUserData } = useGetUser(+id!);

  const isLoading = restUserData.isLoading || restUserActions.isLoading;
  const isError = restUserData.isError || restUserActions.isError;
  const isSuccess = restUserData.isSuccess || restUserActions.isSuccess;
  const error = restUserData.error || restUserActions.error;

  return (
    <>
      <PageHead title={i18next.t("USER_DETAILS")}>
        <PageBreadcrumbs breadcrumbs={userDetailsBreadcrumbs(i18next.t, id!)} />
      </PageHead>

      <BackButton />

      <Box mt={5}>
        <Paper sx={{ width: "100%" }}>
          {isLoading ? (
            <FormSkeleton numOfInputs={6} />
          ) : isError ? (
            <Alert severity="error" variant="outlined">
              {error?.response?.data.message ||
                i18next.t("SOMETHING_WENT_WRONG")}
            </Alert>
          ) : (
            isSuccess && (
              <UserFormForEdit
                formState={userData!}
                disableType={!!userActions?.length}
              />
            )
          )}
        </Paper>
      </Box>
    </>
  );
};

const GuardedUserDetails = withPageGuard(UserDetails, "users", "update");
export default GuardedUserDetails;
