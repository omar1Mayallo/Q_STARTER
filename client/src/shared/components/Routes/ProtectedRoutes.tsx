import { Navigate, Outlet } from "react-router-dom";
import BaseLayout from "../../../layout";
import useUserStore from "../../../store/user.store";

const ProtectedRoutes = ({ inLayout }: { inLayout?: boolean }) => {
  const token = useUserStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return inLayout ? (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
