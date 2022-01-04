import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UrlLink } from "./UrlSettings";

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setError("please enter the required(*) fields");
    } else if (message === "This email is available") {
      setMessage("waiting");
      createAccount();
    }
  };

  function checkEmail() {
    fetch(`${UrlLink}/data`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((userdata) => setMessage(userdata.message));
  }

  useEffect(() => {
    checkEmail();
    // eslint-disable-next-line
  }, [email]);

  function createAccount() {
    fetch(`${UrlLink}/users/SignUp`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((userdata) => setMessage(userdata.message));
  }

  return (
    <Container className="container">
      <Row>
        {message === "waiting" ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : message !== "This email is not available. Try another" &&
          message !== "This email is available" &&
          message ? (
          message
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs="9" sm="7" md="5" lg="4">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span className="error">*</span>First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs="9" sm="7" md="5" lg="4">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span className="error">*</span>Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs="9" sm="7" md="5" lg="4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <span className="error">*</span>Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className="error">
                    {message === "This email is not available. Try another"
                      ? message
                      : ""}
                  </div>
                  <Form.Text className="text-muted">
                    {" "}
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col xs="9" sm="7" md="5" lg="4">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <span className="error">*</span>Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p className="error">{error}</p>
            <Row>
              <Col md="5">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Col>
              <Col md="5">
                <Form.Text className="text">Have an account?</Form.Text>
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => navigate("/Login")}
                >
                  Log in
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Row>
    </Container>
  );
}

export default SignUp;
