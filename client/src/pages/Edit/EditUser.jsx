import React from "react";
import { useParams } from "react-router-dom";
import { apiPath, template } from "../../api/api";
import PageLayout from "../../components/common/Layouts/PageLayout";
import UserForm from "../../components/common/userForm";
import useEditEntity from "../../hooks/useEditEntity";
import useFetch from "../../hooks/useFetch";
import "../styles/addUser.css";

const EditUser = () => {
  const { userId } = useParams();
  const { data } = useFetch(template(apiPath.fetchUserById, { userId }));
  const editUser = useEditEntity(apiPath.editUser, userId);
  const initialValue = data
    ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      }
    : {};

  return (
    <PageLayout title={"Edit User"}>
      <div className="form_container">
        <UserForm
          initialValue={initialValue}
          isEditMode={true}
          handleSubmit={editUser}
        />
      </div>
    </PageLayout>
  );
};

export default EditUser;
