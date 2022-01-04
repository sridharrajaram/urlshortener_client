import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UrlLink } from "./UrlSettings";

function UrlTable() {
  const [urlsData, setUrlsData] = useState([]);
  const handleClick = (event) => {
    event.preventDefault();
  };

  function getUrlsData() {
    fetch(`${UrlLink}/urlsData`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((jsonData) => setUrlsData(jsonData));
  }

  useEffect(() => {
    getUrlsData();
  }, []);

  return (
    <div className="container">
      <h1>URL list Table</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>URL created date</th>
            <th>short URL link</th>
            <th>short URL clicks</th>
            <th>long URL link</th>
          </tr>
        </thead>
        <tbody>
          {urlsData.map((urlData) => (
            <tr>
              <td>{urlData.createdAt}</td>
              <td>
                <a
                  href={urlData.short}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {urlData.short}
                </a>
              </td>
              <td>{urlData.clicks}</td>
              <td>
                <a
                  href={urlData.full}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick}
                >
                  {urlData.full}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UrlTable;
