import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  // const navigate =
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/signIn" />}</div>;
}
