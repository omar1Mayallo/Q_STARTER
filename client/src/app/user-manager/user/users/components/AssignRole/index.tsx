import { Autocomplete, Box, DialogContent } from "@mui/material";
import i18next from "i18next";
import LoadingButton from "../../../../../../shared/components/Buttons/LoadingButton";
import DialogContainer from "../../../../../../shared/components/Dialogs/DialogParts/DialogContainer";
import DialogFooter from "../../../../../../shared/components/Dialogs/DialogParts/DialogFooter";
import useGetAllRoles from "../../../../role/services/getAll";
import { Controller } from "react-hook-form";
import FormInput from "../../../../../../shared/components/Inputs/FormInput";
import { formatToRegularString } from "../../../../../../shared/helpers/formats";
import { translateValidationErrors } from "../../../../../../shared/helpers/factory";

const AssignRoleModal = ({ open, onClose }: any) => {
  const { data, isSuccess, isLoading } = useGetAllRoles();

  return (
    <DialogContainer
      open={open}
      onClose={onClose}
      head={i18next.t("ASSIGN_ROLE")}
      scroll={"paper"}
    >
      <DialogContent dividers>
        <Box
          component="form"
          // onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="myForm"
        >
          <Box id="scroll-dialog-description" ref={null} tabIndex={-1}>
            {/* <Controller
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
                    options={[
                      { id: 1, name: "Role - 1" },
                      { id: 2, name: "Role - 2" },
                      { id: 3, name: "Role" },
                    ]}
                    getOptionLabel={(option) => formatToRegularString(option)}
                    renderInput={(params) => (
                      <FormInput
                        {...params}
                        labelKey={i18next.t("role")}
                        placeholder={i18next.t("role")}
                        isRequired
                        error={invalid}
                        helperText={translateValidationErrors(error?.message)}
                      />
                    )}
                  />
                );
              }}
            /> */}
          </Box>
        </Box>
      </DialogContent>

      <DialogFooter onClose={onClose}>
        <LoadingButton
          type="submit"
          form="myForm"
          label={i18next.t("SAVE")}
          isLoading={false}
          fullWidth={false}
          // disabled={isPending || !isDirty}
        />
      </DialogFooter>
    </DialogContainer>
  );
};

export default AssignRoleModal;
