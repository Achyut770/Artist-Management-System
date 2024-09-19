import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import CustomTitle from '../components/common/CustomTitle';
import PageLayout from '../components/common/Layouts/PageLayout'
import Pagination from '../components/common/Ui/Pagination';
import Table from '../components/common/Table/Table';
import { useAuth } from '../hooks/useAuth';
import { useDelete } from '../hooks/useDelete';
import useAxiosFetch from '../hooks/useFetch';

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
    const { pathname } = useLocation();
    const { data, loading } = useAxiosFetch(`song/${artistId}/?page=${page + 1}&limit=5`, refetch);
    const { deleteItem } = useDelete('song', setRefetch);

    const handlePageClick = useCallback((event) => {
        setPage(event.selected);
    }, []);

    const isArtistManager = user.role === "artist_manager";

    return (
        <PageLayout title={"Songs"}>
            <CustomTitle title={"Songs"} />

            {isArtistManager && (
                <Link to={`${pathname}/add`} className='addButton'>
                    <MdAdd /> Add
                </Link>
            )}
            <Table headings={songHeadings} data={data?.songs} deleteData={deleteItem} action={isArtistManager} loading={loading} />
            <Pagination handlePageClick={handlePageClick} totalPages={data?.totalPages} />
        </PageLayout>
    );
};

export default Song;
