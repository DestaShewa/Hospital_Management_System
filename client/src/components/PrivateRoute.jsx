// src/components/PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  // Get the user info from our global authentication context
  const { userInfo } = useContext(AuthContext);

  // The 'Outlet' component is a placeholder from react-router-dom.
  // It will render the child route element if the parent route matches.
  // In our case, it will be the DashboardPage.

  // If there is user info, it means the user is logged in.
  // In this case, we render the Outlet, which allows access to the requested page.
  // If there is no user info, we use the Navigate component to redirect them to the /login page.

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
