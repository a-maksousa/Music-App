import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const CardsList = (props) => {
  return (
    <Card.Group className="CardsList" itemsPerRow={6}>
      {props.data.map((item) => {
        return <Card description={item[props.labelField]} image={item[props.imageField]} />;
      })}
    </Card.Group>
  );
};

export default CardsList;
