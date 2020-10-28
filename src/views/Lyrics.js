import React from "react";
import { useLocation } from "react-router-dom";
import httpClient from "../httpClient";
import { Header, Segment } from "semantic-ui-react";
import PageLoader from "../components/PageLoader";

const Lyrices = (props) => {
  const location = useLocation();
  const [loaderActive, setLoaderActive] = React.useState(true);
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    const fetchLyrics = async () => {
      const id_artist = location.state.id_artist;
      const id_album = location.state.id_album;
      const id_track = location.state.id_track;
      try {
        const lyricsResponse = await httpClient.get(`artists/${id_artist}/albums/${id_album}/tracks/${id_track}/lyrics`);
        if (lyricsResponse.data.success) {
          setLyrics(lyricsResponse.data.result.lyrics);
        }
      } catch (err) {
        setLyrics("This Track has No Lyrics ...");
      } finally {
        setLoaderActive(false);
      }
    };
    fetchLyrics();
  }, []);

  return (
    <Segment>
      <div className="Lyrics">
        <Header as="h3">{lyrics}</Header>
        <PageLoader active={loaderActive} />
      </div>
    </Segment>
  );
};

export default Lyrices;
