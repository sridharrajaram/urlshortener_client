import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { UrlLink } from "./UrlSettings";

function UrlDashboard() {
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [graph, setGraph] = useState("monthly");
  const [urlsData, setUrlsData] = useState([]);

  function monthlyData() {
    fetch(`${UrlLink}/urlGraph/monthly`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((urldata) => setUrlsData(urldata));
  }
  
  function dailyData(month) {
    fetch(`${UrlLink}/urlGraph/daily/${month}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((urldata) => setUrlsData(urldata));
  }

  useEffect(() => {
    monthlyData();
  }, []);

  const state = {
    labels:
      graph === "monthly"
        ? urlsData.map((urlData) => months[Number(urlData.date)])
        : urlsData.map((urlData) => urlData.date),
    datasets: [
      {
        label: "no of Urls",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: urlsData.map((urlData) => urlData.noOfUrls),
      },
    ],
  };
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="select graph">
        <Dropdown.Item
          onClick={() => {
            setGraph("monthly");
            monthlyData();
          }}
        >
          monthly Data
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setGraph("daily");
            dailyData("01");
          }}
        >
          daily Data
        </Dropdown.Item>
      </DropdownButton>
      <br />
      {graph === "daily" ? (
        <DropdownButton id="dropdown-basic-button" title="select month">
          <Dropdown.Item onClick={() => dailyData("01")}>January</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("02")}>
            February
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("03")}>March</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("04")}>April</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("05")}>May</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("06")}>June</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("07")}>July</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("08")}>August</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("09")}>
            September
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("10")}>October</Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("11")}>
            November
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dailyData("12")}>
            December
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        ""
      )}
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default UrlDashboard;
