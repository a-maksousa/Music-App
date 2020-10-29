import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const PageLoader = (props) => (
  <Dimmer active={props.active}>
    <Loader />
  </Dimmer>
);

export default PageLoader;
