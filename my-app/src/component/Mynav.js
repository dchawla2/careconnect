import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../main.css";
const Mynav = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    onSearch(query);
    navigate(`/search/${query}`);
  };

  return (
    <>
      <Container>
        {/* <Navbar.Brand>CareConnect</Navbar.Brand> */}
        <nav>
          <ul>
            <li>
              <a href="/">Careconnect</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/drugs">Drugs</a>
            </li>
            <li>
              <a href="/illnesses">Illnesses</a>
            </li>
            <li>
              <a href="/hp">HealthcareProvider</a>
            </li>
            <li>
              <a href="/visualizations">Visualizations</a>
            </li>
            <li>
              <a href="/providervisualizations">Provider Visualizations</a>
            </li>
            <SearchBar onSearch={handleSearch} />
          </ul>
        </nav>
      </Container>
    </>
  );
};

export default Mynav;
