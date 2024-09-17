import { useEffect, useState } from 'react';
import { api } from '../services/axios';

const useAxiosFetch = (url, refreshTrigger = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise((res) => setTimeout(() => res(), 2000))
            try {
                console.log("Url", url)
                const response = await api.get(url);
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