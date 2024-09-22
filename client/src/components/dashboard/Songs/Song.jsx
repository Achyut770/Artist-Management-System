import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiPath, template } from "../../../api/api";
import { useDelete } from "../../../hooks/useDelete";
import useFetch from "../../../hooks/useFetch";
import PageLayout from "../../common/Layouts/PageLayout";
import Table from "../../common/Table/Table";
import Pagination from "../../common/Ui/Pagination";

const songHeadings = [
  { key: "title", label: "Title" },
  { key: "genre", label: "Genre" },
  { key: "album_name", label: "Album Name" },
  { key: "artist_name", label: "Artist Name" },
];

const Songs = ({ artistId, isUser = false }) => {
  const [page, setPage] = useState(0);
  const { data, isloading, refetchTrigger } = useFetch(
    template(apiPath.fetchSongs, { page: page + 1, artistId: artistId })
  );
  const { deleteItem } = useDelete(
    template(apiPath.deleteSong, {
      artist_id: artistId,
    }),
    refetchTrigger
  );
  const handlePageClick = useCallback((event) => setPage(event.selected), []);

  return (
    <PageLayout title={"Songs"}>
      {isUser && (
        <Link to={`/mysong/add`} className="add-button">
          <MdAdd /> Add
        </Link>
      )}
      <Table
        headings={songHeadings}
        data={data?.songs}
        deleteData={deleteItem}
        action={isUser}
        isloading={isloading}
      />
      <Pagination
        handlePageClick={handlePageClick}
        totalPages={data?.totalPages}
      />
    </PageLayout>
  );
};

export default Songs;
