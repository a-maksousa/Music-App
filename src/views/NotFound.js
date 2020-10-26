import React from "react";
import { Header } from "semantic-ui-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <div class="notfound">
            <Header as='h3'>Oops! Page not found</Header>
            <Header as='h1'>404</Header>
            <Header as='h2'>we are sorry, but the page you requested was not found</Header>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
