import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Background from "./images/logos/background.png";

function Home() {
  return (
    <Container
      fluid
      className="bg-light text-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row>
          <Col>
            <header class="jumbotron text-center">
              <h1 class="display-4">CareConnect</h1>
              <p class="lead">
                Your comprehensive healthcare information and services platform
              </p>
            </header>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
