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
  const tabs = [
    { name: "tracks", icon: "music" },
    { name: "artists", icon: "group" },
    { name: "albums", icon: "list" },
  ];

  React.useEffect(() => {
    const fetchInitData = async () => {
      const artists = await httpClient.get("/artists", { page: 1 });
      const albums = await httpClient.get(`/artists/${artists.data.result[0].id_artist}/albums`);
      const tracks = await httpClient.get(`artists/${artists.data.result[0].id_artist}/albums/${albums.data.result.albums[0].id_album}/tracks`);
      console.clear();
      console.log(artists);
      console.log(albums);
      console.log(tracks);
      setLoaderActive(false)
    };
    fetchInitData();
  }, []);

  const renderTabContent = () => {
    switch (activeItem) {
      case "tracks":
        return <Tracks />;
      case "artists":
        return <Artists />;
      case "albums":
        return <Albums />;
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
