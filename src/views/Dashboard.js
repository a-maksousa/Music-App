import React from "react";
import Layout from "../components/Layout";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import TabsMenu from "../components/TabsMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import httpClient from "../httpClient";
import PageLoader from "../components/PageLoader";

const Dashboard = (props) => {
  const [activeItem, setActiveItem] = React.useState("tracks");
  const [loaderActive, setLoaderActive] = React.useState(true);
  const [lstArtists, setArtists] = React.useState([]);
  const [lstAlbums, setAlbums] = React.useState([]);
  const [lstTracks, setTracks] = React.useState([]);

  const tabs = [
    { name: "tracks", icon: "music" },
    { name: "artists", icon: "group" },
    { name: "albums", icon: "list" },
  ];

  React.useEffect(() => {
    const fetchInitData = async () => {
      const artists = await httpClient.get("/artists", { page: 1 });
      const albumsResp = await httpClient.get(`/artists/${artists.data.result[5].id_artist}/albums`);
      const tracksResp = await httpClient.get(`artists/${artists.data.result[5].id_artist}/albums/${albumsResp.data.result.albums[0].id_album}/tracks`);

      let tracksResult = [];
      if (tracksResp.data.success) {
        const result = tracksResp.data.result;
        tracksResult = result.tracks.map((trackItem) => ({ ...trackItem, cover: result.cover, artist: result.artist }));
      }

      setArtists(artists.data.success ? artists.data.result : []);
      setAlbums(albumsResp.data.success ? albumsResp.data.result.albums : []);
      setTracks(tracksResult);

      setLoaderActive(false);
    };
    fetchInitData();
  }, []);

  const renderTabContent = () => {
    switch (activeItem) {
      case "tracks":
        return <Tracks lstTracks={lstTracks} />;
      case "artists":
        return <Artists lstArtists={lstArtists} />;
      case "albums":
        return <Albums lstAlbums={lstAlbums} />;
    }
  };
  return (
    <div className="Dashboard">
      <Row>
        <Col>
          <TabsMenu tabs={tabs} activeItem={activeItem} setActiveItem={setActiveItem}>
            {renderTabContent()}
          </TabsMenu>
        </Col>
      </Row>
      <PageLoader active={loaderActive} />
    </div>
  );
};

export default Dashboard;
