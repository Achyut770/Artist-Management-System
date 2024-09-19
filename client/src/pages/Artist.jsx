import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';
import Pagination from '../components/common/Pagination';
import Table from '../components/common/Table';
import ImportExportCsv from '../components/dashboard/Artist/InmportExportCsv';
import useAxiosFetch from '../hooks/useFetch';
import { useAuth } from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivateAxios';
import { useDelete } from '../hooks/useDelete';
import { toast } from 'react-toastify';
import CustomTitle from '../components/common/CustomTitle';

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
    const [page, setPage] = useState(0);
    const { user } = useAuth();
    const { data, loading } = useAxiosFetch(`artist?page=${page + 1}&limit=5`, refetch);
    const axiosPrivate = useAxiosPrivate();
    const { deleteItem } = useDelete('artist', setRefetch);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const addBulk = async (artists) => {
        try {
            const res = await axiosPrivate.post("/artist/bulk_register", { artists });
            toast.success(res.data.message);
            setRefetch((prev) => !prev);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const isArtistManager = user.role === "artist_manager";

    return (
        <PageLayout title={"Artist"}>
            <CustomTitle title={"Artist"} />
            {isArtistManager && (
                <>
                    <ImportExportCsv data={data?.artists} onImport={addBulk} fileName="artist" />
                    <Link to="/artist/add" className='addButton'>
                        <MdAdd /> Add
                    </Link>
                </>
            )}
            <Table headings={artistHeadings} data={data?.artists} deleteData={deleteItem} action={isArtistManager} loading={loading} redirect />
            <Pagination handlePageClick={handlePageClick} totalPages={data?.totalPages} />
        </PageLayout>
    );
};

export default Artist;
