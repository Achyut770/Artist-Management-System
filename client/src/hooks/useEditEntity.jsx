import { toast } from "react-toastify";
import { errorMessage } from "../services/errorMessage";
import useAxiosPrivate from "./usePrivateAxios";

const useEditEntity = (endpoint, entityId) => {
  const axiosPrivate = useAxiosPrivate();
  const editEntity = async (values) => {
    try {
      const res = await axiosPrivate.put(`${endpoint}/${entityId}`, values);
      toast.success(res.data.message);
    } catch (error) {
      console.log("error", error);
      toast.error(errorMessage(error));
    }
  };

  return editEntity;
};

export default useEditEntity;
