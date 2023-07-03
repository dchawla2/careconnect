import React from 'react'
import Container from "react-bootstrap/Container";
import IllnessVisual from './IllnessVisual';
import DrugVisual from './DrugVisual';
import HealthVisual from './HealthVisual';

function Visualizations() {
     return (
         <div className="Visualizations">
                <Container>
                    <DrugVisual />
                    <IllnessVisual />
                    <HealthVisual />
                </Container>
         </div>
     )
 }
 
 export default Visualizations