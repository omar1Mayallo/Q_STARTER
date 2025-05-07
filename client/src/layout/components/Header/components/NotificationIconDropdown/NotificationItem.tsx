import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Grid, Typography } from "@mui/material";
import { green, teal } from "@mui/material/colors";

const NotificationItem = ({ text }: { text: string }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      p={0.5}
    >
      <Grid item>
        <Box
          sx={{
            width: 40,
            height: 40,
            background: `linear-gradient(90deg, ${teal[500]} 0%, ${green[500]} 93%)`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NotificationsIcon style={{ fontSize: 25, color: "white" }} />
        </Box>
      </Grid>

      <Grid item xs>
        <Box className="flex flex-col gap-1 text-wrap">
          <Typography fontSize={12}>
            {text.length > 90
              ? `${text.substring(0, 90).replace(/ [^ ]*$/, "...")}`
              : text}
          </Typography>
          <Typography fontSize={11} color="textSecondary">
            1 hour ago
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotificationItem;
