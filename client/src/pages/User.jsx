import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiPath, template } from "../api/api";
import PageLayout from "../components/common/Layouts/PageLayout";
import Table from "../components/common/Table/Table";
import Pagination from "../components/common/Ui/Pagination";
import { useDelete } from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";

export const userHeadings = [
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "dob", label: "Date of Birth" },
  { key: "gender", label: "Gender" },
  { key: "address", label: "Address" },
  { key: "role", label: "Role" },
];

const User = () => {
  const [page, setPage] = useState(0);

  const { data, isloading, refetchTrigger } = useFetch(
    template(apiPath.fetchUser, { page: page + 1 })
  );

  const handlePageClick = useCallback((e) => setPage(e.selected), []);

  const { deleteItem: deleteUser } = useDelete(
    apiPath.deleteUser,
    refetchTrigger
  );

  return (
    <PageLayout title={"Users"}>
      <Link to="/users/add" className="add-button">
        <MdAdd /> Add
      </Link>
      <Table
        headings={userHeadings}
        data={data?.data}
        deleteData={deleteUser}
        isloading={isloading}
      />
      <Pagination
        handlePageClick={handlePageClick}
        totalPages={data?.totalPages}
      />
    </PageLayout>
  );
};

export default User;
