import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import DrugsCard from "./component/Cards/DrugsCard";
import { DrugData } from "./data/DrugsData";
import FilterDropdown from "./component/FilterDropdown";
import { Form } from "react-bootstrap";
import axios from "axios";
import PaginationComponent from "./component/PaginationComponent";
import "./main.css";

const PAGE_LIM = 30;
// const NUM_CARDS = 992;

const apiUrl = "https://api.careconnect.works/drugs";

function Drugs() {
  const [drugInfoList, setDrugInfoList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [route, setRoute] = useState("");
  const [marketingStatus, setMarketingStatus] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchRegex, setSearchRegex] = useState(null);
  const [preSearch, setPreSearch] = useState("");
  const [NUM_CARDS, setNumCards] = useState(992);

  function clickPage(n) {
    setCurPage(n);
  }
  const handleRouteFilter = (value) => {
    if (value == "Route") {
      setRoute("");
    } else setRoute(value);
  };
  const handleMarketingStatusFilter = (value) => {
    if (value == "Marketing Status") {
      setMarketingStatus("");
    } else setMarketingStatus(value);
  };
  const handleCategoryFilter = (value) => {
    if (value == "Category") {
      setCategory("");
    } else if (value == "Psychiatry & Neurology") {
      setCategory("Psychiatry %26 Neurology");
    } else if (value == "Obstetrics & Gynecology") {
      setCategory("Obstetrics %26 Gynecology");
    } else {
      setCategory(value.toLowerCase());
    }
  };
  const handleSort = (value) => {
    if (value == "Sort") {
      setSort("");
    } else if (value == "Drug Name") {
      setSort("drug_name");
    } else setSort("company_name");
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
    //fetchData(route, marketingStatus, sort, event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setPreSearch(event.target.value);
  };
  const fetchData = async () => {
    let apiUrl = "";
    if (searchTerm !== "") {
      apiUrl = `https://api.careconnect.works/search/drugs/${searchTerm}?`;
    } else {
      apiUrl = "https://api.careconnect.works/drugs?";
    }
    if (marketingStatus !== "") {
      apiUrl += `&marketing_status=${marketingStatus}`;
    }
    if (route !== "") {
      apiUrl += `&route=${route}`;
    }
    if (sort !== "") {
      apiUrl += `&sort=${sort}`;
    }
    if (category !== "") {
      apiUrl += `&category=${category}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    setDrugInfoList(data.data);
    setNumCards(data.data.length);
    setCurPage(1);
    console.log(apiUrl);
  };

  useEffect(() => {
    fetchData();
  }, [route, marketingStatus, sort, searchTerm, category]);

  useEffect(() => {
    if (searchClicked) {
      // fetchData();
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
              placeholder="Search Drugs..."
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
              title="Route"
              items={[
                "Route",
                "Oral",
                "Topical",
                "Injection",
                "Vaginal",
                "Oral-28",
                "Transdermal",
                "Enteral",
                "Intravenous",
                "Subcutaneous",
                "Single-dose",
              ]}
              onChange={handleRouteFilter}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Marketing Status"
              items={[
                "Marketing Status",
                "Prescription",
                "Discontinued",
                "Over-the-counter",
              ]}
              onChange={handleMarketingStatusFilter}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Category"
              items={[
                "Category",
                "Family Medicine",
                "Internal Medicine",
                "Psychiatry & Neurology",
                "Obstetrics & Gynecology",
                "Anesthesiology",
                "Cardiology",
                "Dermatology",
                "Endocrinology",
                "Oncology",
                "Gastroenterology",
              ]}
              onChange={handleCategoryFilter}
            />
          </Col>
          <Col>
            {" "}
            <FilterDropdown
              title="Sort"
              items={["Sort", "Drug Name", "Company Name"]}
              onChange={handleSort}
            />
          </Col>
        </Row>
      </Form>
      <Container style={{ display: "flex" }} className="drug">
        <Row>
          {drugInfoList
            .slice((curPage - 1) * PAGE_LIM, curPage * PAGE_LIM)
            .map((drugData) => {
              return (
                <Col>
                  <DrugsCard
                    id={drugData.id}
                    drug_name={drugData.drug_name}
                    company_name={`${drugData.company_name}`}
                    marketing_status={`${drugData.marketing_status}`}
                    route={`${drugData.route}`}
                    link={`/drugs/${drugData.id}`}
                    image_url={drugData.image_url}
                    category={drugData.category}
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
export default Drugs;
