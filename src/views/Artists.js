import React from "react";
import CardsList from "../components/CardsList";
import { withRouter } from "react-router-dom";
import { ArtistsAlbumsRoute } from "../Routes";

const Artists = (props) => {
  const handleClick = (item) => {
    props.history.push({
      pathname: ArtistsAlbumsRoute,
      state: { id_artist: item.id_artist },
      
    });
  };
  return <CardsList onClick={handleClick} data={props.lstArtists} labelField="artist" />;
};

export default withRouter(Artists);
