import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Divider, Link, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import withPageGuard from "../../shared/components/Routes/withPageGuard";

const Dashboard = () => {
  return (
    <>
      <Helmet title="Template | Dashboard" />

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={4}
      >
        <Typography component={"h1"} variant="h5">
          Dashboard
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <HomeIcon fontSize={"medium"} color="disabled" />
          <Divider orientation="vertical" flexItem />
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              underline="hover"
              color="text.primary"
              to="/dashboard"
              className="flex items-center"
            >
              Dashboard
            </Link>
          </Breadcrumbs>
        </Stack>
      </Stack>
    </>
  );
};

const GuardedDashboard = withPageGuard(Dashboard, "dashboard");
export default GuardedDashboard;
