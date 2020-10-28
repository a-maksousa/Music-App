import React from "react";
import { useLocation } from "react-router-dom";
import httpClient from "../httpClient";
import CardsList from "../components/CardsList";
import PageLoader from "../components/PageLoader";
import { Segment } from "semantic-ui-react";

const ArtistsAlbums = (props) => {
  const location = useLocation();
  const [albums, setAlbums] = React.useState([]);
  const [loaderActive, setLoaderActive] = React.useState(true);
  const columns = [
    { field: "url", title: " ", cellStyle: { width: "10%" }, render: (rowData) => <img src={rowData.cover} style={{ width: 50 }} /> },
    { title: "Track Name", cellStyle: { width: "70%" }, field: "track" },
    { title: "Artist Name", cellStyle: { width: "20%" }, field: "artist" },
  ];

  React.useEffect(() => {
    const fetchLyrics = async () => {
      const id_artist = location.state.id_artist;
      const AlbumsResponse = await httpClient.get(`artists/${id_artist}/albums`);
      if (AlbumsResponse.data.success) {
        setAlbums(AlbumsResponse.data.result.albums);
      }
      setLoaderActive(false);
    };
    fetchLyrics();
  }, []);
  return (
    <Segment>
      <div className="subTabContainer">
        <CardsList data={albums} labelField="album" imageField="cover" />
        <PageLoader active={loaderActive} />
      </div>
    </Segment>
  );
};

export default ArtistsAlbums;
