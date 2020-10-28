import React from "react";
import CardsList from "../components/CardsList";
import { withRouter } from "react-router-dom";
import { ArtistsAlbumsTracksRoute } from "../Routes";
import { Header, Icon } from "semantic-ui-react";

const Albums = (props) => {
  const handleClick = (item) => {
    props.history.push({
      pathname: ArtistsAlbumsTracksRoute,
      state: { id_artist: item.id_artist, id_album: item.id_album },
    });
  };
  return (
    <>
      <Header block as="h2">
        <Icon name="list" />
        <Header.Content>Albums</Header.Content>
      </Header>
      <CardsList onClick={handleClick} data={props.lstAlbums} labelField="album" imageField="cover" />
    </>
  );
};

export default withRouter(Albums);
