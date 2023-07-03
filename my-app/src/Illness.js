import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IllnessType } from "./data/IllnessData";
import IllnessHolder from "./images/logos/illness_placeholder.png";
import "./main.css";

const Illness = () => {
  let { id } = useParams();
  const [illness, setIllness] = useState([]);
  useEffect(() => {
    fetch("https://api.careconnect.works/illnesses/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log("this", res.data);
        setIllness(res.data);
      });
  }, []);

  const handleImageError = (event) => {
    event.target.src = IllnessHolder;
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
    <Container style={{ display: "flex" }} className="illness">
      {illness.map((issue) => {
        const embeddedYoutubeUrl = getEmbeddedYoutubeUrl(issue.youtube_url);
        return (
          <>
            <div className="container">
              <div className="content">
                <h1 className="drug-name">
                  Illness Description: {issue.illness_descr}
                </h1>
                <Row>
                  <Col size={12}>
                    <h3 className="company">Country: {issue.country}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="company">Year: {issue.year}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="company">Region: {issue.region}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <h3 className="status">Estimate Cases:{issue.value}</h3>
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
              </div>
            </div>
          </>
        );
      })}
    </Container>
  );
};

export default Illness;
