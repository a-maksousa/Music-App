import React from "react";
import { useLocation } from "react-router-dom";
import httpClient from "../httpClient";
import CardsList from "../components/CardsList";
import PageLoader from "../components/PageLoader";
import { Segment, Header, Icon } from "semantic-ui-react";

const ArtistsAlbums = (props) => {
  const location = useLocation();
  const [albums, setAlbums] = React.useState([]);
  const [loaderActive, setLoaderActive] = React.useState(true);

  React.useEffect(() => {
    const fetchAlbums = async () => {
      const id_artist = location.state ? location.state.id_artist : 0;
      try {
        const AlbumsResponse = await httpClient.get(`artists/${id_artist}/albums`);
        if (AlbumsResponse.data.success) {
          setAlbums(AlbumsResponse.data.result.albums);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoaderActive(false);
      }
    };
    fetchAlbums();
  }, []);
  return (
    <Segment>
      <div className="subTabContainer">
        <Header block as="h2">
          <Icon name="list" />
          <Header.Content>Related Albums</Header.Content>
        </Header>
        <CardsList data={albums} labelField="album" imageField="cover" />
        <PageLoader active={loaderActive} />
      </div>
    </Segment>
  );
};

export default ArtistsAlbums;
