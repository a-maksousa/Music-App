import React from "react";
import CardsList from "../components/CardsList";
import { withRouter } from "react-router-dom";
import { ArtistsAlbumsRoute } from "../Routes";
import { Header, Icon } from "semantic-ui-react";

const Artists = (props) => {
  const handleClick = (item) => {
    props.history.push({
      pathname: ArtistsAlbumsRoute,
      state: { id_artist: item.id_artist },
    });
  };
  return (
    <>
      <Header block as="h2">
        <Icon name="group" />
        <Header.Content>Artists</Header.Content>
      </Header>
      <CardsList onClick={handleClick} data={props.lstArtists} labelField="artist" />
    </>
  );
};

export default withRouter(Artists);
