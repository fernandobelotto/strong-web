import { Navigate, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useAppSelector } from "../store";
import { useAuthenticated } from "@nhost/react";

export const PublicAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthenticated();

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <>
      <ColorModeSwitcher />

      {children}
    </>
  );
};
