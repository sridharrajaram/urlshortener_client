import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { UrlLink } from "./UrlSettings";

function UrlShortener() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fullUrl) {
      setMessage("waiting");
      getShortUrl();
    } else {
      setMessage("please enter the Url");
    }
  };

  function getShortUrl() {
    fetch(`${UrlLink}/shortUrl`, {
      method: "POST",
      body: JSON.stringify({ fullUrl: fullUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((urlsData) => {
        setShortUrl(urlsData.short);
        setMessage("success");
      });
  }
  return (
    <Container className="container">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter the URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the URL"
                onChange={(event) => setFullUrl(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br />
            {message === "waiting" ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : shortUrl ? (
              <a href="shortUrl">{shortUrl}</a>
            ) : (
              message
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UrlShortener;
