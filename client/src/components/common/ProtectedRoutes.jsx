import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RolesNavigate } from "../../context/AuthProvider";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Ui/Loader";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isloading } = useAuth();
  const location = useLocation();

  if (isloading) return <Loader />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!allowedRoles.includes(user.role))
    return (
      <Navigate
        to={`/${RolesNavigate[user.role]}`}
        state={{ from: location }}
        replace
      />
    );

  return children;
};

export default ProtectedRoute;
