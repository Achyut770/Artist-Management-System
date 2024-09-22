import React from "react";
import "./styles/auth.css";
import LoginForm from "../components/auth/Login";
import { Link, Navigate } from "react-router-dom";
import { RolesNavigate } from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import CustomTitle from "../components/common/CustomTitle";

const LoginPage = () => {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${RolesNavigate[user.role]}`} replace />;
  return (
    <div className="auth_container">
      <CustomTitle title={"Login"} />
      <div className="auth_card">
        <LoginForm />
        <div className="signup-login-link">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
