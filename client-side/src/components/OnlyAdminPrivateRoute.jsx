import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  // const navigate =
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser && currentUser.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/signIn" />
      )}
    </div>
  );
}
