import React from 'react'
import { useParams } from 'react-router-dom'
import UserForm from '../components/common/addUserForm'
import PageLayout from '../components/dashboard/PageLayout'
import useAxiosFetch from '../hooks/fetchs'
import "./styles/addUser.css"
import useAxiosPrivate from '../hooks/usePrivateAxios'
import { toast } from 'react-toastify'

const EditUser = () => {
    const { userId } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const { data, error } = useAxiosFetch(`/auth/${userId}`)
    const initialValue = data ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : ''
    } : {};
    const edit = async (values) => {
        try {
            const res = await axiosPrivate.put(`auth/edit/${userId}`, values)
            toast.success(res.data.message)
        } catch (error) {
            console.log("error", error)
            toast.error("Error")
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <PageLayout title={"Edit User"}>
            <div className='form_container'>
                {error && "Error"}
                <UserForm initialValue={initialValue} isEditMode={true} handleSubmit={edit} />
            </div>
        </PageLayout>

    )
}

export default EditUser