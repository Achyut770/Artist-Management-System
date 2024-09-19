import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import SongForm from '../../components/dashboard/Songs/SongForm';
import useAxiosFetch from '../../hooks/useFetch';
import useEditEntity from '../../hooks/useEditEntity';
import '../styles/addUser.css';
import CustomTitle from '../../components/common/CustomTitle';

const EditSong = () => {
    const { songId } = useParams();
    const { data, error } = useAxiosFetch(`song/single_song/${songId}`);
    const editSong = useEditEntity('song', songId);

    if (error) return <Navigate to="/not-found" />;

    return (
        <PageLayout title={"Edit Song"}>
            <CustomTitle title={"EditSong"} />

            <div className='form_container'>
                <SongForm initialValue={data} isEditMode={true} handleSubmit={editSong} />
            </div>
        </PageLayout>
    );
};

export default EditSong;
