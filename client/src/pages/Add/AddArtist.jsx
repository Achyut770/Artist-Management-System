import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import ArtistForm from '../../components/dashboard/Artist/ArtistForm';
import useAddEntity from '../../hooks/useAddEntity';

const AddArtist = () => {
    const addArtist = useAddEntity("/artist/register");

    return (
        <PageLayout title={"Add Artist"}>
            <ArtistForm handleSubmit={addArtist} />
        </PageLayout>
    );
};

export default AddArtist;
