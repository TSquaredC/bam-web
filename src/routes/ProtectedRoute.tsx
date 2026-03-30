import React from "react";
import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const ProtectedRoute = ({ children, fallback = null }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
};

export default ProtectedRoute;
