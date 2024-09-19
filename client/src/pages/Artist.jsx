import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CustomTitle from '../components/common/CustomTitle';
import PageLayout from '../components/common/PageLayout';
import Pagination from '../components/common/Pagination';
import Table from '../components/common/Table';
import ImportExportCsv from '../components/dashboard/Artist/InmportExportCsv';
import useAddEntity from '../hooks/useAddEntity';
import { useAuth } from '../hooks/useAuth';
import { useDelete } from '../hooks/useDelete';
import useAxiosFetch from '../hooks/useFetch';

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
    const { deleteItem } = useDelete('artist', setRefetch);
    const addBulkArtist = useAddEntity("/artist/bulk_register",)

    const handlePageClick = useCallback((event) => {
        setPage(event.selected);
    }, []);

    const addBulk = useCallback(async (artists) => {
        addBulkArtist({ artists })
        setRefetch((prev) => !prev)
    }, []);

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
