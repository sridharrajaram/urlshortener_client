import React from "react";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="container">
      <div className="home-header">Welcome!</div>
      <div className="home-content">
        Login to see the dashboard, create short URL, list of created URLs
      </div>
    </Container>
  );
}

export default Home;