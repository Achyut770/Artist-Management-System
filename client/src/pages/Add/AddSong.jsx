import React from 'react';
import PageLayout from '../../components/common/Layouts/PageLayout'
import SongForm from '../../components/dashboard/Songs/SongForm';
import { useParams } from 'react-router-dom';
import useAddEntity from '../../hooks/useAddEntity';
import CustomTitle from '../../components/common/CustomTitle';

const AddSong = () => {
    const { artistId } = useParams();
    const addSong = useAddEntity(`/song/${artistId}`);

    const handleAddSong = (values) => {
        addSong(values, { artist_id: artistId });
    };

    return (
        <PageLayout title={"Add Song"}>
            <CustomTitle title={"AddSong"} />

            <SongForm handleSubmit={handleAddSong} />
        </PageLayout>
    );
};

export default AddSong;
