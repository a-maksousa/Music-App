import React from "react";
import CardsList from "../components/CardsList";

const Artists = (props) => {
  return <CardsList data={props.lstArtists} labelField="artist" />;
};

export default Artists;