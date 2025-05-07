import { CircularProgress, Stack, Tooltip, TooltipProps } from "@mui/material";

const LoadingTooltip = ({ children, title, ...restProps }: TooltipProps) => {
  return (
    <Tooltip
      title={
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <span>{title}</span>
          <CircularProgress size={12} color="inherit" />
        </Stack>
      }
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export default LoadingTooltip;
