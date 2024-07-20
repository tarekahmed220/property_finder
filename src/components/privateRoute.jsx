import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";
// import { BounceLoader } from "react-spinners";
import { BeatLoader } from "react-spinners";
export default function PrivateRoute() {
  const { loginStatus, isLoading } = useAuthStatus();
  if (isLoading) {
    return (
      <BeatLoader
        size={"30px"}
        color="#ef5e4e"
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    );
  }
  return loginStatus ? <Outlet /> : <Navigate to="/sign-in" />;
}
