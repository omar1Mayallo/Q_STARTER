import { Home, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Divider, Link, Stack, Typography } from "@mui/material";
import i18next from "i18next";
import { Link as RouterLink } from "react-router-dom";
import { LanguagesE } from "../../../store/language.store";

export interface BreadcrumbItemI {
  name: string;
  url?: string;
}
export interface PageBreadcrumbsProps {
  breadcrumbs: BreadcrumbItemI[];
}
const PageBreadcrumbs = ({ breadcrumbs }: PageBreadcrumbsProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Home fontSize={"medium"} sx={{ color: "text.secondary" }} />
      <Divider orientation="vertical" flexItem />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          i18next.language === LanguagesE.AR ? (
            <NavigateBefore fontSize="small" />
          ) : (
            <NavigateNext fontSize="small" />
          )
        }
      >
        {breadcrumbs.map(({ url, name }) =>
          !url ? (
            <Typography
              key={name}
              sx={{ color: "text.secondary" }}
              component={"span"}
            >
              {name}
            </Typography>
          ) : (
            <Link
              key={name}
              component={RouterLink}
              underline="always"
              color="text.primary"
              to={url}
              className="flex items-center"
            >
              {name}
            </Link>
          ),
        )}
      </Breadcrumbs>
    </Stack>
  );
};

export default PageBreadcrumbs;
