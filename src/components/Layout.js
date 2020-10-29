import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

const Layout = (props) => {
  return (
    <Container>
      <Row>
        <Navbar fixed="top" expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="/">Music App</Navbar.Brand>
        </Navbar>
      </Row>
      {props.children}
    </Container>
  );
};

export default Layout;
