import { toast } from "react-toastify";
import { errorMessage } from "../services/errorMessage";
import useAxiosPrivate from "./usePrivateAxios";

const useAddEntity = (endpoint) => {
  const axiosPrivate = useAxiosPrivate();

  const addEntity = async (values, additionalParams = {}) => {
    try {
      const res = await axiosPrivate.post(endpoint, {
        ...values,
        ...additionalParams,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(errorMessage(error));
      throw error;
    }
  };

  return addEntity;
};

export default useAddEntity;
