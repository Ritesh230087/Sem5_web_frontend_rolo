import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

function GuestRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <>Loading...</>;
  if (user) return <Navigate to="/" />;

  return <Outlet />;
}

export default GuestRoute;
