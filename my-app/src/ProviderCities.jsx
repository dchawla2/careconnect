import React from 'react';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
     {
       "category": "New York",
       "count": 8175133
     },
     {
       "category": "Los Angeles",
       "count": 3792621
     },
     {
       "category": "Chicago",
       "count": 2695598
     },
     {
       "category": "Houston",
       "count": 2099451
     },
     {
       "category": "Philadelphia",
       "count": 1526006
     },
     {
       "category": "Phoenix",
       "count": 1445632
     },
     {
       "category": "San Antonio",
       "count": 1327407
     }
   ]

const ProviderCities = () => {
  return (
    <Container fluid="md">
      <Row style={{ width: "100%", height: 600 }}>
        <h3 className="p-5 text-center"> Top cities by population </h3>
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

export default ProviderCities;
