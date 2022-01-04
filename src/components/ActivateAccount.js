import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UrlLink } from "./UrlSettings";

function ActivateAccount() {
  const { email, token } = useParams();
  const [message, setMessage] = useState("waiting");

  function getMessage() {
    fetch(`${UrlLink}/activateAccount/${email}/${token}`, {
      method: "PUT",
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
      ) : message === "activate account" ? (
        "Sign up success. Click 'Login' to use the account"
      ) : (
        message
      )}
    </Container>
  );
}

export default ActivateAccount;
