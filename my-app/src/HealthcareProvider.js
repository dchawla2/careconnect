import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HealthProviderType } from "./data/HealthCareProviderData";
import HealthCareProviderImageHolder from "./images/logos/healthprovider_placeholder.png";
const HealthProvider = () => {
  let { id } = useParams();
  const [healthprovider, setProvider] = useState([]);
  useEffect(() => {
    fetch("https://api.careconnect.works/healthcare-providers/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log("this", res.data);
        setProvider(res.data);
      });
  }, []);

  const handleImageError = (event) => {
    event.target.src = HealthCareProviderImageHolder;
  };

  return (
    <Container style={{ display: "flex" }} className="health-Provider">
      {healthprovider.map((issue) => {
        return (
          <>
            <div className="container">
              <div className="content">
                <h1 className="healthprovider-name">Name: {issue.name}</h1>
                <Row>
                  <Col size={12}>
                    <h3 className="company">City: {issue.city}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="company">State: {issue.state}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="status">Taxonomy: {issue.taxonomy}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="status">Type: {issue.type}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="status">NPI ID: {issue.id}</h3>
                  </Col>
                </Row>
                <div className="image-container">
                  <Row>
                    <Col size={12}>
                      <h3 className="route">Information</h3>
                      <p>{issue.wiki_text}</p>
                    </Col>
                  </Row>
                </div>
                <div className="image-container">
                  <Row>
                    <Col size={12}>
                      <img
                        src={issue.image_url}
                        onError={handleImageError}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        class="img-scale-down"
                      />
                    </Col>
                  </Row>
                </div>

                <div className="image-container">
                  <Row>
                    <Col size={12}>
                      <div className="justify-content-center d-flex">
                        <iframe
                          width="100%"
                          height="1000"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${issue.address}`}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col size={12}>
                    <a
                      href={
                        issue.related_drug_id != 0
                          ? `/drugs/${issue.related_drug_id}`
                          : ""
                      }
                      class="related-content"
                    >
                      {issue.related_drug_id != 0
                        ? "Related Drug"
                        : "No Related Drug Available"}
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <a
                      href={
                        issue.related_illness_id != 0
                          ? `/illnesses/${issue.related_illness_id}`
                          : ""
                      }
                      class="related-content"
                    >
                      {issue.related_illness_id != 0
                        ? "Related Illness"
                        : "No Related Illness Available"}
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        );
      })}
    </Container>
  );
};

export default HealthProvider;
