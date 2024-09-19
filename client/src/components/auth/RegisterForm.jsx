import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/axios';
import UserForm from '../common/addUserForm';
import './styles/auth.css';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const navigate = useNavigate()

    const register = async (values) => {
        try {
            const res = await api.post("auth/register", values)
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <UserForm handleSubmit={register} />
    );
};

export default RegisterForm;
