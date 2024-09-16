import React, { useEffect, useState } from 'react'
import PageLayout from '../components/dashboard/PageLayout'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import useAxiosFetch from '../hooks/fetchs'
import { useAuth } from '../context/AuthProvider'
import Table from '../components/dashboard/Table'
import Pagination from '../components/dashboard/Pagination'
import useAxiosPrivate from '../hooks/usePrivateAxios'
import { toast } from 'react-toastify'
import ImportExportCsv from '../components/dashboard/Artist/InmportExportCsv'

const artistHeadings = [
    { key: 'name', label: 'Name' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'address', label: 'Address' },
    { key: 'first_release_year', label: 'First Release Year' },
    { key: 'no_of_albums_released', label: 'Number of Albums Released' },
];
const Artist = () => {
    const [refetch, setRefetch] = useState(false);
    const { user } = useAuth()
    const [page, setPage] = useState(0);
    const { data, loading, insert } = useAxiosFetch(`artist?page=${page + 1}&pageSize=10`, refetch);


    const axiosPrivate = useAxiosPrivate();

    const handlePageClick = (e) => {
        setPage(() => e.selected);
    };

    const deleteArtist = async (id) => {
        try {
            const res = await axiosPrivate.delete(`artist/${id}`);
            toast.success(res.data.message);
            setRefetch(!refetch);
        } catch (error) {
            if (error?.response?.data?.error) { toast.error(error.response.data.error) }
            else {
                toast.error("Something Went Wrong")

            }
        }
    };



    return (
        <PageLayout title={"Artist"}>
            {!loading && <ImportExportCsv data={data.artists} onImport={insert} fileName={"artist"} />}
            {user.role === "artist_manager" && <Link to="/artist/add" className='addButton'> <MdAdd /> Add</Link>}
            {loading ? <div>Loading...</div> : <>

                <Table headings={artistHeadings} data={data.artists} deleteData={deleteArtist} />
                <Pagination handlePageClick={handlePageClick} totalPages={data.totalPages} /></>}
        </PageLayout>)
}

export default Artist