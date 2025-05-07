import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const StyledErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: 11,
    borderRadius: theme.shape.borderRadius,
  },
}));

const ErrorTooltip = ({
  children,
  title,
  ...rest
}: TooltipProps & { title: string }) => {
  return (
    <StyledErrorTooltip title={title} {...rest}>
      {children}
    </StyledErrorTooltip>
  );
};

export default ErrorTooltip;
