import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/common/Layouts/PageLayout'
import useAxiosFetch from '../../hooks/useFetch';
import ArtistForm from '../../components/dashboard/Artist/ArtistForm';
import useEditEntity from '../../hooks/useEditEntity';
import '../styles/addUser.css';
import CustomTitle from '../../components/common/CustomTitle';

const EditArtist = () => {
    const { artistId } = useParams();
    const { data, error } = useAxiosFetch(`artist/${artistId}`);
    const editArtist = useEditEntity('artist/edit', artistId);

    const initialValue = data ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : ''
    } : {};

    if (error) return <Navigate to="/not-found" />;

    return (
        <PageLayout title={"Edit Artist"}>
            <CustomTitle title={"Edit Artist"} />

            <div className='form_container'>
                <ArtistForm initialValue={initialValue} isEditMode={true} handleSubmit={editArtist} />
            </div>
        </PageLayout>
    );
};

export default EditArtist;
