import React, { useState } from 'react';
import useAxiosFetch from '../hooks/fetchs';
import Pagination from '../components/dashboard/Pagination'
import useAxiosPrivate from '../hooks/usePrivateAxios';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PageLayout from '../components/dashboard/PageLayout';
import { toast } from 'react-toastify';
import Table from '../components/dashboard/Table';

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
    const axiosPrivate = useAxiosPrivate();

    const { data, loading } = useAxiosFetch(`auth?page=${page + 1}&pageSize=10`, refetch);

    const handlePageClick = (e) => {
        setPage(() => e.selected);
    };


    const deleteUser = async (id) => {
        try {
            const res = await axiosPrivate.delete(`auth/delete/${id}`);
            toast.success(res.data.message);
            setRefetch(!refetch);
        } catch (error) {
            if (error?.response?.data?.error) { toast.error(error.response.data.error) }
            else {
                toast.error("Something Went Wrong")

            }
        }
    };
    console.log("Data", data)


    return (
        <PageLayout title={"Users"}>
            <Link to="/users/add" className='addButton'> <MdAdd /> Add</Link>
            {loading && <p>...Loading...</p>}
            {data && (
                <div>
                    <Table headings={userHeadings} data={data.data} deleteData={deleteUser} />
                    <Pagination handlePageClick={handlePageClick} totalPages={data.totalPages} />
                </div>
            )}
        </PageLayout>
    );
};

export default User;
