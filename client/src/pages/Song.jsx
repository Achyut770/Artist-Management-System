import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import useAxiosFetch from '../hooks/useFetch';
import { useAuth } from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivateAxios';
import { useDelete } from '../hooks/useDelete';

const songHeadings = [
    { key: 'title', label: 'Title' },
    { key: 'genre', label: 'Genre' },
    { key: 'album_name', label: 'Album Name' },
    { key: 'artist_name', label: 'Artist Name' },
];

const Song = () => {
    const [page, setPage] = useState(0);
    const [refetch, setRefetch] = useState(false);
    const { artistId } = useParams();
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { pathname } = useLocation();
    const { data, loading } = useAxiosFetch(`song/${artistId}/?page=${page + 1}&limit=5`, refetch);
    const { deleteItem } = useDelete(axiosPrivate, 'song', setRefetch);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const isArtistManager = user.role === "artist_manager";

    return (
        <PageLayout title={"Songs"}>
            {isArtistManager && <Link to={`${pathname}/add`} className='addButton'><MdAdd /> Add</Link>}
            <Table headings={songHeadings} data={data?.songs} deleteData={deleteItem} action={isArtistManager} loading={loading} />
            <Pagination handlePageClick={handlePageClick} totalPages={data?.totalPages} />
        </PageLayout>
    );
};

export default Song;
