import React from "react";
import DataTable from "../components/DataTable";
import { withRouter } from "react-router-dom";
import { LyricsRoute } from "../Routes";
import { Header, Icon } from "semantic-ui-react";

const Tracks = (props) => {
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img alt="No Img" src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "50%" }, field: "track" },
    { title: "Artist Name", cellStyle: { width: "20%" }, field: "artist" },
    {
      title: "has Lyrics",
      cellStyle: { width: "20%" },
      render: (rowData) =>
        rowData.haslyrics ? (
          <Header color="green" as="h5">
            With Lyrics
          </Header>
        ) : (
          <Header color="red" as="h5">
            No Lyrics
          </Header>
        ),
    },
  ];
  return (
    <>
      <Header block as="h2">
        <Icon name="music" />
        <Header.Content>Tracks</Header.Content>
      </Header>
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
    </>
  );
};

export default withRouter(Tracks);
