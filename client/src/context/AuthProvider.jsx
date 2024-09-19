import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/axios';
import { errorMessage } from '../services/errorMessage';

export const AuthContext = createContext();

export const RolesNavigate = {
    "artist": "songs",
    "super_admin": "users",
    "artist_manager": "artist"
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.post('auth/get-user');
                if (response.status !== 200) {
                    throw response
                }
                setUser(() => response.data);
            } catch (error) {
                console.error('Failed to fetch user', error);
            } finally {
                setLoading(() => false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('auth/login', credentials);
            const data = response.data;
            setUser(() => ({ ...data }))
            toast.success(data.message)
            navigate(`/${RolesNavigate[data.role]}`, { replace: true })
        } catch (error) {
            console.log("Error", error)
            toast.error(errorMessage(error))
        }
    };

    const logout = async () => {
        try {
            const response = await api.post('/auth/logout');
            toast.success(response.data.message)
            setUser(null);
            navigate("/login", { replace: true })
        } catch (error) {
            toast.error(errorMessage(error))
        }
    };
    const value = { user, login, logout, loading, setUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


