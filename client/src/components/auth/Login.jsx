import { useFormik } from 'formik';
import React from 'react';
import './styles/auth.css';
import { loginValidationSchema } from './schemas.js';
import Button from '../common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const LoginForm = () => {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            await login(values);
        },
    });

    return (
        <div className="login-form">
            <h2 className="login-form-title">Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                        {...formik.getFieldProps('email')}
                        aria-describedby="emailHelp"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div id="emailHelp" className="error-text">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`form-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                        {...formik.getFieldProps('password')}
                        aria-describedby="passwordHelp"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div id="passwordHelp" className="error-text">{formik.errors.password}</div>
                    ) : null}
                </div>

                <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
