import { Navigate, Outlet } from "react-router-dom";
import { getMenuItems } from "../../../layout/components/SideDrawer/hooks/useSideDrawerList";
import useUserStore from "../../../store/user.store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PublicRoutes = ({ entities }: { entities: any[] }) => {
  const token = useUserStore((s) => s.token);
  const homePageUrl = entities?.length ? getMenuItems(entities)[0].url : null;

  if (token && homePageUrl) {
    return <Navigate to={homePageUrl} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
