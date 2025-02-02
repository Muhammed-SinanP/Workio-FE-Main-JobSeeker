import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ signIn }) => {
  const { userLoggedIn, initialized } = useSelector((state) => state.user);

  if (initialized) {
    if (signIn && !userLoggedIn) {
      return <Navigate to="/sign/login" replace />;
    }

    if (!signIn && userLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />
  }
};

export default ProtectedRoutes;
