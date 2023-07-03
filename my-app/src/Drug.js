import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { drug_data } from "./data/DrugsData";
import { DrugData } from "./data/DrugsData";
import DrugHolder from "./images/logos/drug.png";
import "./main.css";

const Drug = () => {
  let { id } = useParams();
  const [drug, setDrug] = useState([]);
  useEffect(() => {
    fetch("https://api.careconnect.works/drugs/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        setDrug(res.data);
      });
  }, []);

  const getDrugImage = (route) => {
    const drug = drug_data.find(
      (d) => d.route.toUpperCase() === route.toUpperCase()
    );
    return drug ? drug.img : null;
  };

  const handleImageError = (event) => {
    event.target.src = DrugHolder;
  };

  const getEmbeddedYoutubeUrl = (url) => {
    if (url == "") {
      return null;
    }
    const youtubeUrl = new URL(url);
    const searchParams = new URLSearchParams(youtubeUrl.search);
    const videoId = searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Container style={{ display: "flex" }} className="drug">
      {drug.map((issue) => {
        const imageSrc = getDrugImage(issue.route);
        const embeddedYoutubeUrl = getEmbeddedYoutubeUrl(issue.youtube_url);
        return (
          <>
            <div className="container">
              <div className="content">
                <h1 className="drug-name">Drug Name: {issue.drug_name}</h1>
                <Row>
                  <Col size={12}>
                    <h3 className="company">
                      Company Name: {issue.company_name}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="status">
                      Marketing Status: {issue.marketing_status}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="category">
                      Category: {issue.category}
                    </h3>
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
                      <h3 className="route">
                        Administration Route: {issue.route}
                      </h3>
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={issue.route}
                          width="300"
                          height="200"
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
                <div className="image-container">
                  <Row>
                    <Col size={12}>
                      <h3 className="route">Drug Picture:</h3>
                      {imageSrc && (
                        <img
                          src={issue.image_url}
                          onError={handleImageError}
                          className="img-scale-down"
                        />
                      )}
                    </Col>
                  </Row>
                </div>
                <div className="image-container">
                  <Row>
                    <Col size={12}>
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={embeddedYoutubeUrl}
                          title="YouTube video"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col size={12}>
                    <a
                      href={
                        issue.related_healthcare_id != 0
                          ? `/healthcare-providers/${issue.related_healthcare_id}`
                          : ""
                      }
                      class="related-content"
                    >
                      {issue.related_healthcare_id != 0
                        ? "Related Healthcare Provider"
                        : "No Related Healthcare Provider Available"}
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

export default Drug;
