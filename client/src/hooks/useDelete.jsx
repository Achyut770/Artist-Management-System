import { toast } from 'react-toastify';
import { errorMessage } from '../services/errorMessage';
import useAxiosPrivate from './usePrivateAxios';

export const useDelete = (endpoint, refetch) => {
    const axiosPrivate = useAxiosPrivate()
    const deleteItem = async (id) => {
        try {
            const res = await axiosPrivate.delete(`${endpoint}/${id}`);
            toast.success(res.data.message);
            refetch((prev) => !prev);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    };

    return { deleteItem };
};
