import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { UrlLink } from "./UrlSettings";

function Forgot({ email, setEmail }) {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      setMessage("waiting");
      sendEmail();
    } else {
      setError("please enter the email");
    }
  };

  function sendEmail() {
    fetch(`${UrlLink}/users/forgot`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((userdata) => setMessage(userdata.message));
  }
  
  return (
    <Container className="container">
      {message ? (
        message === "waiting" ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          message
        )
      ) : (
        <Row>
          <Col xs="auto" sm="7" md="6" lg="4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="error">{error}</div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <br />
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Forgot;
