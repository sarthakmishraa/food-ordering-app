import { Navigate } from "react-router-dom";
import { useUserDetails } from "../slices/appContextSlice";
import { useAppSelector } from "../store/hooks";
import { ReactNode } from "react";

function ProtectedRoute({
  children,
}: {
  children?: ReactNode;
}) {
  const { data: userDetails } =
    useAppSelector(useUserDetails);
  const loggedIn = userDetails?.loggedIn;

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
