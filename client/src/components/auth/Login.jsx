import React from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import useFormHandler from '../../hooks/useFormHandles.jsx';
import Button from '../common/Ui/Button.jsx';
import InputField from '../common/Ui/Input.jsx';
import { loginValidationSchema } from './schemas.js';
import './styles/auth.css';

const LoginForm = () => {
    const { login } = useAuth();
    const initialValues = {
        email: '',
        password: '',
    }
    const formik = useFormHandler({ initialValues, validationSchema: loginValidationSchema, handleSubmit: login, isEditMode: false })

    return (
        <div className="login-form">
            <h2 className="login-form-title">Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    ariaDescribedBy="emailHelp"
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    ariaDescribedBy="passwordHelp"
                />

                <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
