import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiPath, template } from "../../api/api";
import CustomTitle from "../../components/common/CustomTitle";
import PageLayout from "../../components/common/Layouts/PageLayout";
import SongForm from "../../components/dashboard/Songs/SongForm";
import { useAuth } from "../../hooks/useAuth";
import useEditEntity from "../../hooks/useEditEntity";
import useFetch from "../../hooks/useFetch";
import "../styles/addUser.css";

const EditSong = () => {
  const { songId } = useParams();
  const { user } = useAuth();
  const { data, error } = useFetch(template(apiPath.fetchSongById, { songId }));
  const editSong = useEditEntity(
    template(apiPath.editSong, { artistId: user.artist_id }),
    songId
  );

  if (error) return <Navigate to="/not-found" />;

  return (
    <PageLayout title={"Edit Song"}>
      <CustomTitle title={"EditSong"} />

      <div className="form_container">
        <SongForm
          initialValue={data}
          isEditMode={true}
          handleSubmit={editSong}
        />
      </div>
    </PageLayout>
  );
};

export default EditSong;
