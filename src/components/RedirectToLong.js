import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UrlLink } from "./UrlSettings";

function RedirectToLong() {
  const [message, setMessage] = useState("waiting");
  const { short } = useParams();

  function redirect() {
    fetch(`${UrlLink}/${short}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((urlData) => {
        window.location.href = urlData.full;
        setMessage("none");
      });
  }

  useEffect(() => {
    redirect();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="container">
      {message === "waiting" ? (
        <>
          <div className="home-content">
            Please wait until we redirect you to the URL
          </div>
          <div className="home-header">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
          </div>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

export default RedirectToLong;
