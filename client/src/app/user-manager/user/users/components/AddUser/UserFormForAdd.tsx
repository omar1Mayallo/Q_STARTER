import {
  Autocomplete,
  Box,
  FormControlLabel,
  Grid,
  Switch,
} from "@mui/material";
import i18next from "i18next";
import { Controller } from "react-hook-form";
import LoadingButton from "../../../../../../shared/components/Buttons/LoadingButton";
import FormInput from "../../../../../../shared/components/Inputs/FormInput";
import MUIPhoneNumberInput from "../../../../../../shared/components/Inputs/MUIPhoneNumberInput";
import MUIUploadImgInput from "../../../../../../shared/components/Inputs/MUIUploadImgInput";
import { formatToRegularString } from "../../../../../../shared/helpers/formats";
import useUploadImage from "../../../../../../shared/hooks/useUploadImage";
import {
  USER_STATUS,
  USER_TYPE,
} from "../../../../../../shared/types/models/User.model";

import PasswordInput from "../../../../../../shared/components/Inputs/PasswordInput";
import { translateValidationErrors } from "../../../../../../shared/helpers/factory";
import useAddUser from "../../services/addOne";
import useAddUserForm, {
  AddUserFormData,
} from "../../validations/addUser.validations";

const UserFormForAdd = () => {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useAddUserForm();

  const { ...uploadImgProps } = useUploadImage(null);

  // HANDLE_ADD_USER
  const { mutate, isPending } = useAddUser(setError);
  const onSubmit = (data: AddUserFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    const formData = new FormData();
    Object.keys(userData).map((key) => {
      const typedKey = key as keyof Omit<AddUserFormData, "confirmPassword">;
      formData.append(typedKey, userData[typedKey] as string);
      if (typeof userData[typedKey] !== "boolean" && !userData[typedKey]) {
        formData.delete(`${typedKey}`);
      }
    });
    mutate(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate p={3}>
      <Grid container columnSpacing={3} rowSpacing={2}>
        {/* Username */}
        <Grid item xs={12} md={6} lg={4}>
          <FormInput
            inputProps={{
              ...register("username"),
            }}
            error={!!errors.username}
            helperText={translateValidationErrors(errors.username?.message)}
            labelKey={i18next.t("username")}
            placeholder={i18next.t("username")}
            name="username"
            type="text"
            variant="outlined"
            fullWidth
            isRequired
          />
        </Grid>
        {/* Email */}
        <Grid item xs={12} md={6} lg={4}>
          <FormInput
            inputProps={{
              ...register("email"),
            }}
            error={!!errors.email}
            helperText={translateValidationErrors(errors.email?.message)}
            labelKey={i18next.t("email")}
            placeholder={i18next.t("email")}
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            isRequired
          />
        </Grid>
        {/* Password */}
        <Grid item xs={12} md={6} lg={4}>
          <PasswordInput
            inputProps={{
              ...register("password"),
            }}
            error={!!errors.password}
            helperText={translateValidationErrors(errors.password?.message)}
            labelKey={i18next.t("password")}
            placeholder={i18next.t("password")}
            name="password"
            variant="outlined"
            fullWidth
            isRequired
          />
        </Grid>
        {/* Confirm Password */}
        <Grid item xs={12} md={6} lg={4}>
          <PasswordInput
            inputProps={{
              ...register("confirmPassword"),
            }}
            error={!!errors.confirmPassword}
            helperText={translateValidationErrors(
              errors.confirmPassword?.message,
            )}
            labelKey={i18next.t("confirmPassword")}
            placeholder={i18next.t("confirmPassword")}
            name="confirmPassword"
            variant="outlined"
            fullWidth
            isRequired
          />
        </Grid>
        {/* Phone */}
        <Grid item xs={12} md={6} lg={4}>
          <Controller
            name="phone"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error, invalid },
            }) => (
              <MUIPhoneNumberInput
                value={value!}
                handleChange={(_, info) => {
                  onChange(info.numberValue);
                }}
                fullWidth
                labelKey={i18next.t("phone")}
                placeholder={i18next.t("phone")}
                isRequired
                error={invalid}
                helperText={translateValidationErrors(error?.message)}
              />
            )}
          />
        </Grid>
        {/* Type */}
        <Grid item xs={12} md={6} lg={4}>
          <Controller
            control={control}
            name="type"
            render={({
              field: { onChange, value },
              fieldState: { error, invalid },
            }) => {
              return (
                <Autocomplete
                  onChange={(_, selectedValue) => onChange(selectedValue)}
                  value={value || null}
                  options={Object.values(USER_TYPE)}
                  getOptionLabel={(option) => formatToRegularString(option)}
                  renderInput={(params) => (
                    <FormInput
                      {...params}
                      labelKey={i18next.t("type")}
                      placeholder={i18next.t("type")}
                      isRequired
                      error={invalid}
                      helperText={translateValidationErrors(error?.message)}
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        {/* Avatar */}
        <Grid item xs={12} md={6} lg={4}>
          <Controller
            name="avatar"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <MUIUploadImgInput
                  {...uploadImgProps}
                  handleFieldChange={field.onChange}
                  labelKey={i18next.t("avatar")}
                  fullWidth
                  isRequired
                  error={Boolean(fieldState.error)}
                  helperText={translateValidationErrors(
                    fieldState.error?.message,
                  )}
                />
              );
            }}
          />
        </Grid>
        {/* Switches */}
        <Grid item xs={12} className="flex flex-row gap-2">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label={i18next.t("status")}
                control={
                  <Switch
                    {...field}
                    checked={field.value === USER_STATUS.ACTIVE}
                    color="success"
                    onChange={(e) =>
                      field.onChange(
                        e.target.checked
                          ? USER_STATUS.ACTIVE
                          : USER_STATUS.INACTIVE,
                      )
                    }
                  />
                }
              />
            )}
          />
          <Controller
            name="login_with_otp"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={i18next.t("loginWithOTP")}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box textAlign={"center"} mt={3}>
        <LoadingButton
          type="submit"
          label={i18next.t("save")}
          isLoading={isPending}
          fullWidth={false}
          sx={{ minWidth: 130 }}
          // disabled={!isValid || isSubmitting}
        />
      </Box>
    </Box>
  );
};

export default UserFormForAdd;
