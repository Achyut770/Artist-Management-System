import React from "react";
import { apiPath, template } from "../../api/api";
import PageLayout from "../../components/common/Layouts/PageLayout";
import SongForm from "../../components/dashboard/Songs/SongForm";
import useAddEntity from "../../hooks/useAddEntity";
import { useAuth } from "../../hooks/useAuth";

const AddSong = () => {
  const { user } = useAuth();
  const addSong = useAddEntity(
    template(apiPath.addSong, { artist_id: user.artist_id })
  );

  const handleAddSong = (values) =>
    addSong(values, { artist_id: user.artist_id });

  return (
    <PageLayout title={"Add Song"}>
      <SongForm handleSubmit={handleAddSong} />
    </PageLayout>
  );
};

export default AddSong;
