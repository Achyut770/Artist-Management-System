import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiPath, template } from "../api/api";
import PageLayout from "../components/common/Layouts/PageLayout";
import Table from "../components/common/Table/Table";
import Pagination from "../components/common/Ui/Pagination";
import ImportExportCsv from "../components/dashboard/Artist/ImportExportCsv";
import useAddEntity from "../hooks/useAddEntity";
import { useAuth } from "../hooks/useAuth";
import { useDelete } from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";
import { artistSchema } from "../components/dashboard/Artist/schema";
import { toast } from "react-toastify";

const artistHeadings = [
  { key: "name", label: "Name" },
  { key: "dob", label: "Date of Birth" },
  { key: "gender", label: "Gender" },
  { key: "address", label: "Address" },
  { key: "first_release_year", label: "First Release Year" },
  { key: "no_of_albums_released", label: "Number of Albums Released" },
];

const Artist = () => {
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const isArtistManager = user.role === "artist_manager";
  const { data, isloading, refetchTrigger } = useFetch(
    template(apiPath.fetchArtist, { page: page + 1 })
  );
  const { deleteItem } = useDelete(apiPath.deleteArtist, refetchTrigger);
  const addBulkArtist = useAddEntity(apiPath.addBultkArtist);

  const handlePageClick = useCallback((event) => setPage(event.selected), []);

  const addBulk = useCallback(async (artists) => {
    for (const artist of artists) {
      try {
        await artistSchema.validate(artist);
      } catch (error) {
        return toast.error("Validation error");
      }
    }

    if (artists.length > 0) {
      await addBulkArtist({ artists: artists });
      refetchTrigger();
    }
  }, []);

  return (
    <PageLayout title={"Artist"}>
      {isArtistManager && (
        <>
          <ImportExportCsv
            data={data?.artists}
            onImport={addBulk}
            fileName="artist"
          />
          <Link to="/artist/add" className="add-button">
            <MdAdd /> Add
          </Link>
        </>
      )}
      <Table
        headings={artistHeadings}
        data={data?.artists}
        deleteData={deleteItem}
        action={isArtistManager}
        isloading={isloading}
        redirect
      />
      <Pagination
        handlePageClick={handlePageClick}
        totalPages={data?.totalPages}
      />
    </PageLayout>
  );
};

export default Artist;
