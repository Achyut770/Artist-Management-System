import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import PageLayout from "../../components/common/Layouts/PageLayout";
import "../styles/addUser.css";

const AddUser = () => {
  return (
    <PageLayout title={"Add User"}>
      <div className="form_container">
        <RegisterForm />
      </div>
    </PageLayout>
  );
};

export default AddUser;
