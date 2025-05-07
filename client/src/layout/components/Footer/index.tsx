import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component={"footer"} className="p-3">
      <Box className="flex_between">
        <Typography>© 2023 All rights reserved</Typography>
        <Typography>
          Made with{" "}
          <FavoriteIcon
            fontSize={"medium"}
            className="inline text-red-500 transition-transform duration-300 hover:scale-110"
          />{" "}
          by Itqan Team
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
