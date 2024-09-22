import React from "react";
import { apiPath } from "../../api/api";
import PageLayout from "../../components/common/Layouts/PageLayout";
import ArtistForm from "../../components/dashboard/Artist/ArtistForm";
import useAddEntity from "../../hooks/useAddEntity";

const AddArtist = () => {
  const addArtist = useAddEntity(apiPath.addArtist);

  return (
    <PageLayout title={"Add Artist"}>
      <ArtistForm handleSubmit={addArtist} />
    </PageLayout>
  );
};

export default AddArtist;
