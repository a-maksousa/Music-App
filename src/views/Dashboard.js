import React from "react";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import Lyrices from "./Lyrics";
import TabsMenu from "../components/TabsMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import httpClient from "../httpClient";
import PageLoader from "../components/PageLoader";
import { Switch, Route } from "react-router-dom";
import { Segment, Header } from "semantic-ui-react";
import { TracksRoute, AlbumsRoute, ArtistsRoute, LyricsRoute } from "../Routes";

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
      const artists = await httpClient.get("/artists", { page: 1 });
      const albumsResp = await httpClient.get(`/artists/${artists.data.result[5].id_artist}/albums`);
      const tracksResp = await httpClient.get(
        `artists/${artists.data.result[5].id_artist}/albums/${albumsResp.data.result.albums[0].id_album}/tracks`
      );

      let tracksResult = [];
      if (tracksResp.data.success) {
        const result = tracksResp.data.result;
        tracksResult = result.tracks.map((trackItem) => ({
          ...trackItem,
          cover: result.cover,
          artist: result.artist,
          id_album: result.id_album,
          id_artist: result.id_artist,
        }));
      }

      setArtists(artists.data.success ? artists.data.result : []);
      setAlbums(albumsResp.data.success ? albumsResp.data.result.albums : []);
      setTracks(tracksResult);

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
              <Route exact path="/">
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
