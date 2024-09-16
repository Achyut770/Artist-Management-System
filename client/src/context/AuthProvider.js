import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/refreshToken';
import { toast } from 'react-toastify';

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
            navigate(`/${RolesNavigate[role]}`)

        } catch (error) {
            if (error?.response?.data?.error) { toast.error(error.response.data.error) }
            else {
                toast.error("Something Went Wrong")

            }
        }
    };

    const logout = () => {
        localStorage.removeItem('refreshToken');
        navigate("/login")
        setUser(null);
    };

    const value = { user, login, logout, loading, setUser };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


export const useAuth = () => useContext(AuthContext)