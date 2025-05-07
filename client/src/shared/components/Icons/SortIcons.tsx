import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Stack } from "@mui/material";

interface SortIconsProps {
  activeAsc: boolean;
  activeDesc: boolean;
  disabled: boolean;
}

const SortIcons: React.FC<SortIconsProps> = ({
  activeAsc,
  activeDesc,
  disabled,
}) => {
  const ascColor = disabled ? "inherit" : activeAsc ? "primary" : "inherit";
  const descColor = disabled ? "inherit" : activeDesc ? "primary" : "inherit";
  return (
    <Stack sx={{ position: "relative" }}>
      <ArrowDropUp
        sx={{ position: "absolute", top: "-13px", fontSize: 20 }}
        color={ascColor}
      />
      <ArrowDropDown
        sx={{ position: "absolute", bottom: "-13px", fontSize: 20 }}
        color={descColor}
      />
    </Stack>
  );
};

export default SortIcons;
