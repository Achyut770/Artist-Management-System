import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import "./styles/auth.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RolesNavigate } from "../context/AuthProvider";
import CustomTitle from "../components/common/CustomTitle";

const Register = () => {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${RolesNavigate[user.role]}`} replace />;
  return (
    <div className="auth_container">
      <CustomTitle title={"Register"} />
      <div className="auth_card">
        <h2>Register</h2>
        <RegisterForm />
        <div className="signup-login-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
