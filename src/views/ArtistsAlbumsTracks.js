import React from "react";
import PageLoader from "../components/PageLoader";
import { Segment, Header,Icon } from "semantic-ui-react";
import httpClient from "../httpClient";
import { useLocation } from "react-router-dom";
import DataTable from "../components/DataTable";

const ArtistsAlbumsTracks = (props) => {
  const location = useLocation();
  const [tracks, setTracks] = React.useState([]);
  const [loaderActive, setLoaderActive] = React.useState(true);
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "70%" }, field: "track" },
    { title: "Artist Name", cellStyle: { width: "20%" }, field: "artist" },
  ];

  React.useEffect(() => {
    const fetchTracks = async () => {
      const id_artist = location.state.id_artist;
      const id_album = location.state.id_album;
      const TracksResponse = await httpClient.get(`artists/${id_artist}/albums/${id_album}/tracks`);
      if (TracksResponse.data.success) {
        setTracks(TracksResponse.data.result.tracks.map((item) => ({ ...item, cover: TracksResponse.data.result.cover })));
      }
      setLoaderActive(false);
    };
    fetchTracks();
  }, []);

  return (
    <Segment>
      <div className="subTabContainer">
      <Header as="h2" block>
          <Icon name="music" />
          <Header.Content>Related Tracks</Header.Content>
        </Header>
        <DataTable columns={columns} data={tracks} />
        <PageLoader active={loaderActive} />
      </div>
    </Segment>
  );
};

export default ArtistsAlbumsTracks;
