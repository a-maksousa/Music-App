import React from "react";
import CardsList from "../components/CardsList";
const Albums = (props) => {
  return <CardsList data={props.lstAlbums} labelField="album" imageField="cover" />;
};

export default Albums;
