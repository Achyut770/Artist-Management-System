import { api } from "../services/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    const response = await api.post("/refresh_token");
    setUser((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
