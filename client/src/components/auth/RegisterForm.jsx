import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/axios";
import UserForm from "../common/userForm";
import "./styles/auth.css";
import { toast } from "react-toastify";
import { apiPath } from "../../api/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const register = async (values) => {
    try {
      const res = await api.post(apiPath.addUser, values);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  return <UserForm handleSubmit={register} />;
};

export default RegisterForm;
