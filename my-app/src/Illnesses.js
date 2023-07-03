import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IllnessCard from "./component/Cards/IllnessCard";
import { IllnessType } from "./data/IllnessData";
import FilterDropdown from "./component/FilterDropdown";
import { Form } from "react-bootstrap";
import PaginationComponent from "./component/PaginationComponent";
import "./main.css";

const PAGE_LIM = 30;

function Illnesses() {
  const [illnessInfo, setIllnesses] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchRegex, setSearchRegex] = useState(null);
  const [sort, setSort] = useState("");
  const [preSearch, setPreSearch] = useState("");
  const [NUM_CARDS, setNumCards] = useState(5130);

  function clickPage(n) {
    setCurPage(n);
  }
  const handleRegionFilter = (value) => {
    if (value == "Region") {
      setRegion("");
    } else {
      setRegion(value);
    }
  };
  const handleCountryFilter = (value) => {
    if (value == "Country") {
      setCountry("");
    } else {
      setCountry(value);
    }
  }
  const handleSort = (value) => {
    if (value == "Sort") {
      setSort("");
    } else if (value == "Country") {
      setSort("country");
    } else if (value == "Estimated Cases") {
      setSort("value");
    } else if (value == "Name") {
      setSort("illness");
    } else setSort("year");
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchClicked(true);
    setSearchTerm(preSearch);
    if (preSearch != null && preSearch != "") {
      setSearchRegex(new RegExp(`${preSearch.replaceAll(" ", "|")}`, "i"));
    } else {
      setSearchRegex(null);
    }
  };
  const handleSearchTermChange = (event) => {
    setPreSearch(event.target.value);
  };

  const fetchData = async () => {
    let apiUrl = "";
    if (searchTerm !== "") {
      apiUrl = `https://api.careconnect.works/search/illnesses/${searchTerm}?`;
    } else {
      apiUrl = "https://api.careconnect.works/illnesses?";
    }
    if (region !== "") {
      apiUrl += `&region=${region}`;
    }
    if (sort !== "") {
      apiUrl += `&sort=${sort}`;
    }
    if (country !== "") {
      apiUrl += `&country=${country}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();

    setIllnesses(data.data);
    setNumCards(data.data.length);
    setCurPage(1);
    console.log(apiUrl);
  };

  useEffect(() => {
    fetchData();
  }, [region, sort, country, searchTerm]);

  useEffect(() => {
    if (searchClicked) {
      fetchData();
      setSearchClicked(false);
    }
  }, [searchClicked]);

  let totPages = Math.ceil(NUM_CARDS / PAGE_LIM);
  let pagItems = [];
  if (curPage > 3) {
    pagItems.push({
      content: "1",
      onClick: () => clickPage(1),
      isActive: 1 === curPage,
    });
    pagItems.push({ content: "...", onClick: null, isActive: false });
  }
  for (let i = curPage - 2; i <= curPage + 2; i++) {
    if (i > 0 && i <= totPages) {
      pagItems.push({
        content: i,
        onClick: () => clickPage(i),
        isActive: i === curPage,
      });
    }
  }
  if (curPage < totPages - 2) {
    pagItems.push({ content: "...", onClick: null, isActive: false });
    pagItems.push({
      content: totPages,
      onClick: () => clickPage(totPages),
      isActive: totPages === curPage,
    });
  }

  return (
    <Container className="illnesses">
      <Container>
        <PaginationComponent
          pagItems={pagItems}
          curPage={curPage}
          PAGE_LIM={PAGE_LIM}
          NUM_CARDS={NUM_CARDS}
        />
      </Container>
      <Form className="filter-form">
        <Row className="mx-auto text-center w-50 mb-4">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search Illnesses..."
              value={preSearch}
              onChange={handleSearchTermChange}
            />
            <button type="submit" onClick={handleSearch}>
              Search
            </button>
          </form>
          <Col>
            {" "}
            <FilterDropdown
              title="Sort"
              items={["Sort", "Name", "Year", "Estimated Cases"]}
              onChange={handleSort}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Region"
              items={[
                "Region",
                "Africa",
                "Americas",
                "Eastern Mediterranean",
                "Europe",
                "Global",
                "South East Asia",
                "Western Pacific",
              ]}
              onChange={handleRegionFilter}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Country"
              items={[
                "Country",
                "Libya",
                "Yemen",
                "Portugal",
                "Germany",
                "United States of America",
                "Mexico",
                "Philippines",
                "China",
                "India",
                "Thailand",
                "Nigeria",
                "Rwanda",
                "Uganda",
              ]}
              onChange={handleCountryFilter}
            />
          </Col>
        </Row>
      </Form>
      <Container style={{ display: "flex" }} className="illness">
        <Row>
          {illnessInfo
            .slice((curPage - 1) * PAGE_LIM, curPage * PAGE_LIM)
            .map((issue) => {
              return (
                <Col>
                  <IllnessCard
                    id={issue.id}
                    title={issue.country}
                    img={issue.image_url}
                    text={`${issue.illness}`}
                    region={`${issue.region}`}
                    property2={`${issue.value}`}
                    property3={`${issue.year}`}
                    link={`/illnesses/${issue.id}`}
                    regex={searchRegex}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
      <Container>
        <PaginationComponent
          pagItems={pagItems}
          curPage={curPage}
          PAGE_LIM={PAGE_LIM}
          NUM_CARDS={NUM_CARDS}
        />
      </Container>
    </Container>
  );
}
export default Illnesses;
