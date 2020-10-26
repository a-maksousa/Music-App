import React from "react";
import DataTable from "../components/DataTable";
const Tracks = (props) => {
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "70%" }, field: "track" },
    { title: "Artist Name", cellStyle: { width: "20%" }, field: "artist" },
  ];
  return <DataTable columns={columns} data={props.lstTracks} />;
};

export default Tracks;
