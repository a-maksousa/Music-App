import React from "react";
import PageLoader from "../components/PageLoader";
import { Segment, Header, Icon } from "semantic-ui-react";
import httpClient from "../httpClient";
import { useLocation } from "react-router-dom";
import DataTable from "../components/DataTable";
import { withRouter } from "react-router-dom";
import { LyricsRoute } from "../Routes";

const ArtistsAlbumsTracks = (props) => {
  const location = useLocation();
  const [tracks, setTracks] = React.useState([]);
  const [loaderActive, setLoaderActive] = React.useState(true);
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img alt="No Img" src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "70%" }, field: "track" },
  ];

  React.useEffect(() => {
    const fetchTracks = async () => {
      const id_artist = location.state ? location.state.id_artist : 0;
      const id_album = location.state ? location.state.id_album : 0;
      try {
        const TracksResponse = await httpClient.get(`artists/${id_artist}/albums/${id_album}/tracks`);
        if (TracksResponse.data.success) {
          setTracks(TracksResponse.data.result.tracks.map((item) => ({ ...item, cover: TracksResponse.data.result.cover,id_artist,id_album })));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoaderActive(false);
      }
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
          data={tracks}
        />
        <PageLoader active={loaderActive} />
      </div>
    </Segment>
  );
};

export default withRouter(ArtistsAlbumsTracks);
