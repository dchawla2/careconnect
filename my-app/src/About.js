import React, { useState, useEffect } from "react";
import {
  StatisticsCall,
  ContributorInfo,
  getTotalCommits,
} from "./utils/GitLabUtils";
import ListOfTeamInfoCards from "./component/Cards/ListOfTeamInfoCards";
import { Container, ListGroup } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { teamInfo } from "./data/TeamInfo";
import axios from "axios";
import "./main.css";
import ListOfApiCards from "./component/Cards/ListOfApiCards";
import ListOfToolCards from "./component/Cards/ListOfToolCards";

const About = () => {
  const [totalNumIssues, setTotalNumIssues] = useState(0);
  useEffect(() => {
    fetch("https://gitlab.com/api/v4/projects/43437415/issues_statistics")
      .then(function (response) {
        return response.text();
      })
      .then(function (myJson) {
        let stats = JSON.parse(myJson);
        let result = stats.statistics.counts.all;
        setTotalNumIssues(result);
      });
  }, []);

  const [contributorInfoList, setContributorInfo] = useState([]);
  // useEffect(() => {
  //     fetch('https://gitlab.com/api/v4/projects/43437415/repository/contributors')
  //         .then(function (response) {
  //             return response.text();
  //         })
  //         .then(function (myJson) {
  //             let contributorInfoList  = JSON.parse(myJson)
  //             console.log("about page contributorInfoList", contributorInfoList)
  //             setContributorInfo(contributorInfoList)
  //         });
  // }, [])

  useEffect(() => {
    const url =
      "https://gitlab.com/api/v4/projects/43437415/repository/contributors";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let contributors = [
          { name: "rebecca", commits: 0 },
          { name: "Michael Tesfaye", commits: 0 },
          { name: "Akshar Shrivats", commits: 0 },
          { name: "Dhruv Chawla", commits: 0 },
          { name: "Aneesh N", commits: 0 },
        ];

        data.forEach((entry) => {
          let contributor = contributors.find(
            (c) => c.name.toLowerCase() === entry.name.toLowerCase()
          );
          if (contributor) {
            contributor.commits += entry.commits;
          }
        });

        setContributorInfo(contributors);
        console.log("about page contributorInfoList", contributors);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <title>About Us</title>
      <div className="about text-center">
        <div className="row gx-3">
          <div className="intro">
            <h1> What is CareConnect ?</h1>
            <p style={{ fontSize: 18 }}>
              With the increasing need for accessible and reliable healthcare
              information and services, it's crucial to develop a platform that
              provides users with accurate and up-to-date information about
              illnesses, treatments, and medical providers. This is where
              "CareConnect" comes in. Our website aims to provide users with a
              comprehensive healthcare experience by utilizing data from the WHO
              Athena API, the FDA Drug API, and the NPPES Medical Provider API.
              With this integration, we aim to provide users with the necessary
              tools to make informed decisions about their health.
            </p>
          </div>
        </div>
      </div>
      <div className="about text-center">
        <h1>
          <a
            href="https://documenter.getpostman.com/view/25858087/2s93CEvG3i"
            target="_blank"
            rel="noreferrer"
          >
            Postman Documentation
          </a>
        </h1>
        <h1>
          <a
            href="https://gitlab.com/akshars1/careconnect"
            target="_blank"
            rel="noreferrer"
          >
            Gitlab Repo
          </a>
        </h1>
        <h1> Our Team Member </h1>
      </div>
      <ListOfTeamInfoCards
        className="container text-center"
        listOfContributorInfo={contributorInfoList}
      />
      <Table striped>
        <thead>
          <tr>
            <th>Total Commits</th>
            <th>Total Issues:</th>
            <th>Total UnitTests:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getTotalCommits(contributorInfoList)}</td>
            <td>{totalNumIssues}</td>
            <td>{0}</td>
          </tr>
        </tbody>
      </Table>
      <Container className="title-about">
        <h1> APIs </h1>
      </Container>
      <Container className="cards">
        <ListOfApiCards />
      </Container>
      <Container className="title-about">
        <h1> Develop Tools </h1>
      </Container>
      <Container className="cards">
        <ListOfToolCards />
      </Container>
    </div>
  );
};

export default About;
