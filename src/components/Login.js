import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UrlLink } from "./UrlSettings";

function Login({ setLoginState }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      setMessage("waiting");
      loginAccount();
    } else {
      setError("Please enter the required(*) fields");
    }
  };

  function loginAccount() {
    fetch(`${UrlLink}/users/Login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
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
        <Col xs="auto" sm="7" md="6" lg="4">
          {message === "waiting" ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : message ? (
            message
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <span className="error">*</span>Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
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
              <p className="error">{error}</p>
              <Button variant="success" type="submit">
                Login
              </Button>
              <br />
              <Link to="/Forgot" className="link">
                Forgot password?
              </Link>
              <br />
              <Button
                variant="primary"
                className="centre-button"
                onClick={() => navigate("/SignUp")}
              >
                Create account
              </Button>
            </Form>
          )}
        </Col>
      </Row>
      {message === "successful login!!!" ? setLoginState("success") : ""}
    </Container>
  );
}
export default Login;
