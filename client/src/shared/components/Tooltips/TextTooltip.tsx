import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface TextTooltipProps {
  text: string;
  allowLength?: number;
}
const TextTooltip = ({ text, allowLength = 35 }: TextTooltipProps) => {
  const truncatedText =
    text.length >= allowLength ? text.substring(0, allowLength) + "..." : text;
  return (
    <>
      {text.length >= allowLength ? (
        <Tooltip title={text} arrow>
          <Typography noWrap>{truncatedText}</Typography>
        </Tooltip>
      ) : (
        <Typography>{text}</Typography>
      )}
    </>
  );
};

export default TextTooltip;
