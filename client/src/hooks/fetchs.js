import { useState, useEffect } from 'react';
import { api } from '../services/axios';
import { toast } from 'react-toastify';

const useAxiosFetch = (url, refreshTrigger = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, refreshTrigger]);

    const insert = (insertData) => {
        toast.info("Called")
        setData((prev) => ({ ...prev, artists: [...prev.artists, ...insertData] }))
    }

    console.log("FecthData", data)


    return { data, loading, error, insert };
};

export default useAxiosFetch;