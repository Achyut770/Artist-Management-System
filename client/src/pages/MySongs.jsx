import React from "react";
import { useAuth } from "../hooks/useAuth";
import Songs from "../components/dashboard/Songs/Song";
import "./styles/mySong.css";
import { IoMdTime } from "react-icons/io";

const MySongs = () => {
  const { user } = useAuth();
  if (!user.artist_id)
    return (
      <div className="wait_until_container">
        <span className="time_icon">
          <IoMdTime />
        </span>
        <span className="wait_until">Wait until You are made an artist</span>
      </div>
    );
  return <Songs artistId={user.artist_id} isUser />;
};

export default MySongs;
