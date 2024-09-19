import { useEffect, useState } from 'react';
import useAxiosPrivate from './usePrivateAxios';

const useAxiosFetch = (url, refreshTrigger = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((res) => setTimeout(() => res(), 2000))
            try {
                const response = await axiosPrivate.get(url);
                setData(response.data);
            } catch (err) {
                setData([])
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, refreshTrigger]);

    return { data, loading, error };
};

export default useAxiosFetch;