import React from 'react'
import Container from "react-bootstrap/Container";
import ProviderArtists from './ProviderArtists';
import ProviderConcerts from './ProviderConcerts';
import ProviderCities from './ProviderCities';

function ProviderVisualizations() {
     return (
         <div className="ProviderVisualizations">
                <Container>
                    <ProviderArtists />
                    <ProviderConcerts />
                    <ProviderCities />
                </Container>
 
         </div>
     )
 }
 
 export default ProviderVisualizations