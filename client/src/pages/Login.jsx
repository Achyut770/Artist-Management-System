import React from 'react';
import './styles/login.css';
import LoginForm from '../components/auth/Login';
import { Link, Navigate } from 'react-router-dom';
import { RolesNavigate, useAuth } from '../context/AuthProvider';

const LoginPage = () => {
    const { user } = useAuth()
    if (user) return <Navigate to={`/${RolesNavigate[user.role]}`} replace />
    return (
        <div className="auth_container">
            <div className='auth_card'>
                <LoginForm />
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
