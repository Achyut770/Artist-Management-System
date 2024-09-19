import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/refreshToken';
import { toast } from 'react-toastify';
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
                const response = await api.post('auth/get-user', { refreshToken });
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
            const { refreshToken, accessToken, role, message } = response.data;
            localStorage.setItem('refreshToken', refreshToken);
            setUser(() => ({ accessToken, role }))
            toast.success(message)
            navigate(`/${RolesNavigate[role]}`, { replace: true })

        } catch (error) {
            toast.error(errorMessage(error))

        }
    };

    const logout = () => {
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate("/login", { replace: true })

    };

    const value = { user, login, logout, loading, setUser };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


