import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterDropdown from "./component/FilterDropdown";
import { Form } from "react-bootstrap";
import axios from "axios";
import HealthProviderCard from "./component/Cards/HealthProviderCard";
import { HealthProviderType } from "./data/HealthCareProviderData";
import HealthCareProviderImageHolder from "./images/logos/healthprovider_placeholder.png";
import PaginationComponent from "./component/PaginationComponent";
const PAGE_LIM = 30;

const apiUrl = "https://api.careconnect.works/healthcare-providers";

function Drugs() {
  const [healthProviderInfoList, setHealthProviderInfoList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchRegex, setSearchRegex] = useState(null);
  const [preSearch, setPreSearch] = useState("");
  const [NUM_CARDS, setNumCards] = useState(200);

  function clickPage(n) {
    setCurPage(n);
  }
  const handleTypeFilter = (value) => {
    if (value == "Type") {
      setType("");
    } else {
      setType(value);
    }
  };
  const handleSort = (value) => {
    if (value == "Sort") {
      setSort("");
    } else {
      setSort(value.toLowerCase());
    }
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
      apiUrl = `https://api.careconnect.works/search/healthcare-providers/${searchTerm}?`;
    } else {
      apiUrl = "https://api.careconnect.works/healthcare-providers?";
    }
    if (type !== "") {
      apiUrl += `&type=${type}`;
    }
    if (sort !== "") {
      apiUrl += `&sort=${sort}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    setHealthProviderInfoList(data.data);
    setNumCards(data.data.length);
    setCurPage(1);
    console.log(apiUrl);
  };

  useEffect(() => {
    fetchData();
  }, [type, sort, searchTerm]);

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
    <Container>
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
              placeholder="Search HealthProviders..."
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
              title="Type"
              items={["Type", "NPI-1", "NPI-2"]}
              onChange={handleTypeFilter}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Sort"
              items={["Sort", "Name", "Taxonomy", "Address", "ID"]}
              onChange={handleSort}
            />
          </Col>
        </Row>
      </Form>
      <Container style={{ display: "flex" }} className="drug">
        <Row>
          {healthProviderInfoList
            .slice((curPage - 1) * PAGE_LIM, curPage * PAGE_LIM)
            .map((issue) => {
              return (
                <Col>
                  <HealthProviderCard
                    id={issue.id}
                    title={issue.name}
                    text={`${issue.city}, ${issue.state}`}
                    property1={`${issue.taxonomy}`}
                    property2={`${issue.type}`}
                    property3={`${issue.id}`}
                    property4={`${issue.address}`}
                    image_url={issue.image_url}
                    regex={searchRegex}
                    link={`/healthcare-providers/${issue.id}`}
                    image_holder={HealthCareProviderImageHolder}
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
export default Drugs;
