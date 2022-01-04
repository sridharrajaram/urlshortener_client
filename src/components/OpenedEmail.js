import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UrlLink } from "./UrlSettings";

function OpenedEmail() {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password) {
      setMessage("waiting");
      updatePassword();
    } else {
      setError("please enter the password");
    }
  };

  const [error, setError] = useState("");
  const [message, setMessage] = useState("waiting");
  const { email, token } = useParams();
  const [password, setPassword] = useState("");

  function getMessage() {
    fetch(`${UrlLink}/retrieveAccount/${email}/${token}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((userdata) => setMessage(userdata.message));
  }

  function updatePassword() {
    fetch(`${UrlLink}/resetPassword/${email}/${token}`, {
      method: "PUT",
      body: JSON.stringify({ newPassword: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((userdata) => setMessage(userdata.message));
  }

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Container className="container">
      {message === "waiting" ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : message === "retrieve account" ? (
        <Row>
          <Col xs="auto" sm="7" md="6" lg="4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <div className="error">{error}</div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <br />
            </Form>
          </Col>
        </Row>
      ) : (
        message
      )}
    </Container>
  );
}

export default OpenedEmail;
