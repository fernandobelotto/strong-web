import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";
import { useAuthenticated } from "@nhost/react";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const isAuthenticated = useAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
