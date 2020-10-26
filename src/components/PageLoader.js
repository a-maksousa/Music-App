import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const PageLoader = (props) => (
  <Dimmer active={props.active}>
    <Loader />
  </Dimmer>
);

export default PageLoader;
