import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Nav, NavItem, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap';
import DrugsCard from './Cards/DrugsCard';
import HealthProviderCard from './Cards/HealthProviderCard';
import IllnessCard from './Cards/IllnessCard';

const SearchOverall = (query) => {
  // const { query } = useParams();
  console.log('Search query Overall:', query);

  const [searchData, setSearchData] = useState([]);
  const [key, setKey] = useState('drugs');
  const [drug, setDrugData] = useState([]);
  const [illnesses, setIllnessData] = useState([]);
  const [healthProviders, setHealthProviderData] = useState([]);
  // const [sRegex, setSRegex] = useState("");
  const sRegex = new RegExp(`${query.query.replaceAll(" ", "|")}`, "i");
  // const sRegex = new RegExp(/a|t/);

  const fetchSearchData = async () => {
    const url = "https://api.careconnect.works/search/";
    const drugresponse = await fetch(url +"drugs/" + query.query);
    console.log("drug response", url +"drugs/" + query.query);
    const drugdata = await drugresponse.json();
    console.log("drug data", drugdata);
    setDrugData(drugdata.data);
    const illnessresponse = await fetch(url +"illnesses/" + query.query);
    const illnessdata = await illnessresponse.json();
    console.log("illness data", illnessdata);
    setIllnessData(illnessdata.data);
    const healthresponse = await fetch(url +"healthcare-providers/" + query.query);
    const healthdata = await healthresponse.json();
    console.log("health data", healthdata);
    setHealthProviderData(healthdata.data);
  };

  useEffect(() => {
    fetchSearchData();
  }, [query.query]);

  const handleSelect = (key) => {
    setKey(key);
  };

  return (
    <Container>
      <p>Search Result {query.query}</p>

      <Nav fill variant="tabs" defaultActiveKey="drugs" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="drugs">Drugs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="illnesses">Illnesses</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="health-providers">Health Providers</Nav.Link>
        </Nav.Item>
      </Nav>

      {key === "drugs" && (
        <>
          {drug.map((drug_data) => (
            <DrugsCard
              key={drug_data.id}
              id={drug_data.id}
              drug_name={drug_data.drug_name}
              image_url={drug_data.image_url}
              company_name={drug_data.company_name}
              marketing_status={drug_data.marketing_status}
              route={drug_data.route}
              link={`/drugs/${drug_data.id}`}
              category={drug_data.category}
              regex = {sRegex}
            />
          ))}
        </>
      )}

      {key === "illnesses" && (
        <>
          {illnesses.map((issue) => (
             <Col>
             <IllnessCard
               id={issue.id}
               title={issue.country}
               text={issue.illness}
               region={issue.region}
               property2={issue.value}
               property3={issue.year}
               link={`/illnesses/${issue.id}`}
               img={issue.image_url}
               regex={sRegex}
             />
           </Col>
          ))}
        </>
      )}

      {key === "health-providers" && (
         <>
         {healthProviders.map((issue) => (
           <Col key={issue.id}>
             <HealthProviderCard
               id={issue.id}
               title={issue.name}
               text={`Location: ${issue.city}, ${issue.state}`}
               property1={`${issue.taxonomy}`}
               property2={`${issue.type}`}
               property3={`${issue.id}`}
               property4={issue.address}
               image_url={issue.image_url}
               link={`/healthcare-providers/${issue.id}`}
               regex={sRegex}
             />
           </Col>
         ))}
       </>
      )}
    </Container>
  );
};

export default SearchOverall;
