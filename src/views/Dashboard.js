import React from "react";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import Lyrices from "./Lyrics";
import ArtistsAlbums from "./ArtistsAlbums";
import TabsMenu from "../components/TabsMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import httpClient from "../httpClient";
import PageLoader from "../components/PageLoader";
import { Switch, Route } from "react-router-dom";
import { Segment, Header } from "semantic-ui-react";
import { TracksRoute, AlbumsRoute, ArtistsRoute, LyricsRoute, ArtistsAlbumsRoute, MainRoute } from "../Routes";

const Dashboard = (props) => {
  const [activeItem, setActiveItem] = React.useState("tracks");
  const [loaderActive, setLoaderActive] = React.useState(true);
  const [lstArtists, setArtists] = React.useState([]);
  const [lstAlbums, setAlbums] = React.useState([]);
  const [lstTracks, setTracks] = React.useState([]);

  const tabs = [
    { name: "tracks", icon: "music", link: TracksRoute },
    { name: "artists", icon: "group", link: ArtistsRoute },
    { name: "albums", icon: "list", link: AlbumsRoute },
  ];

  React.useEffect(() => {
    const fetchInitData = async () => {
      const artistsResp = await httpClient.get("/artists", { page: 1 });
      const artists = artistsResp.data.success ? artistsResp.data.result : [];

      const albumsResp = await httpClient.get(`/artists/${artists[5].id_artist}/albums`);
      const albums = albumsResp.data.success ? albumsResp.data.result.albums : [];

      const tracksResp = await httpClient.get(`artists/${artists[5].id_artist}/albums/${albums[0].id_album}/tracks`);
      const tacks = tracksResp.data.success
        ? tracksResp.data.result.tracks.map((item) => ({
            ...item,
            cover: albums[0].cover,
            id_album: albums[0].id_album,
            artist: artists[5].artist,
            id_artist: artists[5].id_artist,
          })) : [];

      setArtists(artists);
      setAlbums(albums);
      setTracks(tacks);

      setLoaderActive(false);
    };
    fetchInitData();
  }, []);

  return (
    <div className="Dashboard">
      <Row>
        <Col>
          <TabsMenu tabs={tabs} activeItem={activeItem} setActiveItem={setActiveItem}>
            <Switch>
              <Route exact path={ArtistsRoute}>
                <Artists lstArtists={lstArtists} />
              </Route>
              <Route exact path={AlbumsRoute}>
                <Albums lstAlbums={lstAlbums} />
              </Route>
              <Route exact path={TracksRoute}>
                <Tracks lstTracks={lstTracks} />
              </Route>
              <Route exact path={LyricsRoute}>
                <Lyrices />
              </Route>
              <Route exact path={ArtistsAlbumsRoute}>
                <ArtistsAlbums />
              </Route>
              <Route exact path={MainRoute}>
                <Segment>
                  <Header as="h1">Latest Artists</Header>
                  <Artists lstArtists={lstArtists.slice(0, 5)} />
                </Segment>
                <Segment>
                  <Header as="h1">Latest Albums</Header>
                  <Albums lstAlbums={lstAlbums.slice(0, 5)} />
                </Segment>
                <Segment>
                  <Header as="h1">Latest Tracks</Header>
                  <Tracks lstTracks={lstTracks.slice(0, 5)} />
                </Segment>
              </Route>
            </Switch>
          </TabsMenu>
        </Col>
      </Row>
      <PageLoader active={loaderActive} />
    </div>
  );
};

export default Dashboard;
