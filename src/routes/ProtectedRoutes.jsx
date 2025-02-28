import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ signInRequired }) => {
  const { userLoggedIn } = useSelector((state) => state.user);

  if (signInRequired && !userLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!signInRequired && userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

};

export default ProtectedRoutes;
