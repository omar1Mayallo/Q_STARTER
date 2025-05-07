import { SvgIconComponent } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler } from "react";

export interface IconButtonTooltipProps {
  Icon: SvgIconComponent;
  variant?: string;
  hover?: string;
  tooltip?: string;
  textVariant?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const IconButtonTooltip = ({
  Icon,
  variant,
  hover,
  tooltip,
  textVariant,
  onClick,
  disabled = false,
}: IconButtonTooltipProps) => {
  return (
    <Tooltip title={tooltip} arrow>
      <span>
        <IconButton
          disabled={disabled}
          onClick={onClick}
          sx={{
            ...(variant && {
              color: (theme) =>
                theme.palette.getContrastText(textVariant || variant),
              backgroundColor: variant,
              "&:hover": {
                backgroundColor: hover,
              },
              "&.Mui-disabled": {
                backgroundColor: (theme) =>
                  theme.palette.action.disabledBackground,
                color: (theme) => theme.palette.action.disabled,
              },
            }),
          }}
        >
          <Icon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default IconButtonTooltip;
