import { useEffect, useState } from "react";
import useAxiosPrivate from "./usePrivateAxios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(url);
        setData(response.data);
      } catch (err) {
        setData([]);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, refetch]);

  const refetchTrigger = () => {
    setRefetch((prev) => !prev);
  };

  return { data, isloading, error, refetchTrigger };
};

export default useFetch;
