import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/common/Layouts/PageLayout'
import UserForm from '../../components/common/addUserForm';
import useAxiosFetch from '../../hooks/useFetch';
import useEditEntity from '../../hooks/useEditEntity';
import '../styles/addUser.css';
import CustomTitle from '../../components/common/CustomTitle';

const EditUser = () => {
    const { userId } = useParams();
    const { data, error } = useAxiosFetch(`/auth/${userId}`);
    const editUser = useEditEntity('auth/edit', userId);

    const initialValue = data ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : ''
    } : {};

    return (
        <PageLayout title={"Edit User"}>
            <CustomTitle title={"EditUser"} />
            <div className='form_container'>
                {error && "Error"}
                <UserForm initialValue={initialValue} isEditMode={true} handleSubmit={editUser} />
            </div>
        </PageLayout>
    );
};

export default EditUser;
