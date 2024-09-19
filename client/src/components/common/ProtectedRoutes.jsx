import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RolesNavigate } from '../../context/AuthProvider';
import Loader from './Ui/Loader';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={`/${RolesNavigate[user.role]}`} state={{ from: location }} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;