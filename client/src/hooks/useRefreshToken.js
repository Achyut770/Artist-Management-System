import { useAuth } from '../context/AuthProvider';
import { api } from '../services/axios';
import { refreshToken } from '../services/refreshToken';

const useRefreshToken = () => {
    const { setUser } = useAuth();

    const refresh = async () => {
        const response = await api.post('/refresh_token', { refreshToken });
        setUser(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;