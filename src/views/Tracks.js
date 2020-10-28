import React from "react";
import DataTable from "../components/DataTable";
import { withRouter } from "react-router-dom";
import { LyricsRoute } from "../Routes";

const Tracks = (props) => {
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "70%" }, field: "track" },
    { title: "Artist Name", cellStyle: { width: "20%" }, field: "artist" },
  ];
  return (
    <DataTable
      handleRowSelect={(selectedRow) => {
        props.history.push({
          pathname: LyricsRoute,
          state: {
            id_artist: selectedRow.id_artist,
            id_album: selectedRow.id_album,
            id_track: selectedRow.id_track,
          },
        });
      }}
      columns={columns}
      data={props.lstTracks}
    />
  );
};

export default withRouter(Tracks);
