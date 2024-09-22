import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiPath } from "../../api/api";
import PageLayout from "../../components/common/Layouts/PageLayout";
import ArtistForm from "../../components/dashboard/Artist/ArtistForm";
import useEditEntity from "../../hooks/useEditEntity";
import useFetch from "../../hooks/useFetch";
import "../styles/addUser.css";

const EditArtist = () => {
  const { artistId } = useParams();
  const { data, error } = useFetch(`artist/${artistId}`);
  const editArtist = useEditEntity(apiPath.editArtist, artistId);

  const initialValue = data
    ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      }
    : {};

  if (error) return <Navigate to="/not-found" />;

  return (
    <PageLayout title={"Edit Artist"}>
      <div className="form_container">
        <ArtistForm
          initialValue={initialValue}
          isEditMode={true}
          handleSubmit={editArtist}
        />
      </div>
    </PageLayout>
  );
};

export default EditArtist;
