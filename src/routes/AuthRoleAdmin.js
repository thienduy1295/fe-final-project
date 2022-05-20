import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthRoleAdmin({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user.roles !== "admin") {
    return <Navigate to="/NotPermission" state={{ from: location }} replace />;
  }
  return children;
}

export default AuthRoleAdmin;
