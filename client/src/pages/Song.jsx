import React from "react";
import { useParams } from "react-router-dom";
import Songs from "../components/dashboard/Songs/Song";

const Song = () => {
  const { artistId } = useParams();
  return <Songs artistId={artistId} />;
};

export default Song;
