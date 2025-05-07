import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import i18next from "i18next";
import LoadingButton from "../../../../../shared/components/Buttons/LoadingButton";
import { LanguagesE } from "../../../../../store/language.store";
import { PermissionsTreeI } from "../../types";
import usePermissionTreeHandlers from "./usePermissionTreeHandlers";

interface PermissionsTreeProps {
  systemPermissions: PermissionsTreeI;
  actions?: string[];
  handleSubmit: (checkedItems: string[]) => void;
  isPending: boolean;
}

const PermissionsTree: React.FC<PermissionsTreeProps> = ({
  systemPermissions,
  actions = [],
  handleSubmit,
  isPending,
}) => {
  const {
    checkedItems,
    handleActionChange,
    handleEntityChange,
    handleModuleChange,
    handleSelectAllChange,
    handleViewOnlyChange,
    isAllChecked,
    isEntityChecked,
    isModuleChecked,
    isViewOnlyChecked,
  } = usePermissionTreeHandlers(systemPermissions, actions);

  const onSubmit = () => handleSubmit(checkedItems);

  return (
    <Stack gap={3}>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllChecked()}
              onChange={(e) => handleSelectAllChange(e.target.checked)}
            />
          }
          label={i18next.t("SELECT_ALL")}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isViewOnlyChecked()}
              onChange={(e) => handleViewOnlyChange(e.target.checked)}
            />
          }
          label={i18next.t("VIEW_ONLY")}
        />
      </Box>

      <Box>
        {systemPermissions.map((module) => (
          <Accordion key={module.module_key} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${module.module_key}-content`}
              id={`panel-${module.module_key}-header`}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isModuleChecked(module.module_key)}
                    onChange={(e) =>
                      handleModuleChange(module.module_key, e.target.checked)
                    }
                  />
                }
                label={
                  i18next.language === LanguagesE.EN
                    ? module.module_en_name
                    : module.module_ar_name
                }
              />
            </AccordionSummary>
            <AccordionDetails
              sx={i18next.language === LanguagesE.EN ? { ml: 3 } : { mr: 3 }}
            >
              {module.entities.map((entity) => (
                <Box key={entity.entity_key} sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isEntityChecked(entity.entity_key)}
                        onChange={(e) =>
                          handleEntityChange(
                            module.module_key,
                            entity.entity_key,
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label={
                      i18next.language === LanguagesE.EN
                        ? entity.entity_en_name
                        : entity.entity_ar_name
                    }
                  />

                  <Box
                    sx={
                      i18next.language === LanguagesE.EN ? { ml: 4 } : { mr: 4 }
                    }
                  >
                    {entity.actions.map((action) => (
                      <FormControlLabel
                        key={action.action_key}
                        control={
                          <Checkbox
                            size="small"
                            checked={checkedItems.includes(action.action_key)}
                            onChange={(e) =>
                              handleActionChange(
                                action.action_key,
                                entity.entity_key,
                                module.module_key,
                                e.target.checked,
                              )
                            }
                          />
                        }
                        label={
                          i18next.language === LanguagesE.EN
                            ? action.action_en_name
                            : action.action_ar_name
                        }
                        sx={{ display: "block" }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box className="flex justify-end">
        <LoadingButton
          label={i18next.t("SAVE")}
          isLoading={isPending}
          disabled={isPending}
          fullWidth={false}
          onClick={onSubmit}
        />
      </Box>
    </Stack>
  );
};

export default PermissionsTree;
