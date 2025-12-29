import React from "react";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
};

export default ProtectedRoute;
