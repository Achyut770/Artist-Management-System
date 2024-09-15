import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import './styles/register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="auth_container">
            <div className='auth_card'>
                <h2>Register</h2>

                <RegisterForm />
                <div className="signup-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>

        </div>
    );
};

export default Register;