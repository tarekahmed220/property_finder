import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";

import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loginStatus, isLoading } = useAuthStatus();
  if (isLoading) {
    return <Spinner />;
  }
  return loginStatus ? <Outlet /> : <Navigate to="/sign-in" />;
}
