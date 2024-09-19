import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CustomTitle from '../components/common/CustomTitle';
import PageLayout from '../components/common/PageLayout';
import Pagination from '../components/common/Pagination';
import Table from '../components/common/Table';
import { useDelete } from '../hooks/useDelete';
import useAxiosFetch from '../hooks/useFetch';

export const userHeadings = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'address', label: 'Address' },
    { key: 'role', label: 'Role' },
];


const User = () => {
    const [page, setPage] = useState(0);
    const [refetch, setRefetch] = useState(false);

    const { data, loading, error } = useAxiosFetch(`auth?page=${page + 1}&pageSize=10`, refetch);

    const handlePageClick = (e) => {
        setPage(() => e.selected);
    };
    const { deleteItem: deleteUser } = useDelete("auth/delete", setRefetch)

    return (
        <PageLayout title={"Users"}>
            <CustomTitle title={"Users"} />
            <Link to="/users/add" className='addButton'> <MdAdd /> Add</Link>
            <Table headings={userHeadings} data={data?.data} deleteData={deleteUser} loading={loading} />
            <Pagination handlePageClick={handlePageClick} totalPages={data?.totalPages} />
        </PageLayout>
    );
};

export default User;
