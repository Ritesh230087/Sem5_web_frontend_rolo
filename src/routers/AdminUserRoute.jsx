import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

function AdminUserRoute() {
  const { user, loading } = useContext(AuthContext); 
  const location = useLocation();

  if (loading) return <>Loading...</>;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminUserRoute;

