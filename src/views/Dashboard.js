import React from "react";
import Layout from "../components/Layout";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import TabsMenu from "../components/TabsMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Segment } from "semantic-ui-react";
const Dashboard = (props) => {
  const [activeItem, setActiveItem] = React.useState("tracks");
  const tabs = [
      {name:"tracks",icon:"music"},
      {name:"artists",icon:"group"},
      {name:"albums",icon:"list"}
  ]
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
          <TabsMenu
            tabs={tabs}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            {renderTabContent()}
          </TabsMenu>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
