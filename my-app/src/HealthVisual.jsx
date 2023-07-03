import React from 'react';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { category: "Family Medicine", count: 19 },
  { category: "Dermatology", count: 39 },
  { category: "Obstetrics & Gynecology", count: 16 },
  { category: "Anesthesiology", count: 26 },
  { category: "Internal Medicine", count: 48 },
  { category: "Gastroenterology", count: 8 },
  { category: "Endocrinology", count: 5 },
  { category: "Oncology", count: 5 },
  { category: "Psychiatry & Neurology", count: 18 },
  { category: "Cardiology", count: 6 }
];

const HealthVisual = () => {
  return (
    <Container fluid="md">
      <Row style={{ width: "100%", height: 600 }}>
        <h3 className="p-5 text-center"> Healthcare Provider Category </h3>
        <Col>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#0d1538" }} />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="count" stroke="#0d1538" fill="#0d1538" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default HealthVisual;
