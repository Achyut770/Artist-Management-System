import { useEffect } from "react";
import { axiosPrivate } from "../services/axios";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const { user } = useAuth();
    const refresh = useRefreshToken()
    const { accessToken } = user
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;