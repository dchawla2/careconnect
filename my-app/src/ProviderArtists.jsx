import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer} from 'recharts';

const data = [
     {country: 'CA', count: 11},
     {country: 'US', count: 218},
     {country: 'PR', count: 10},
     {country: 'CO', count: 5},
     {country: 'KR', count: 6},
     {country: 'GB', count: 12},
     {country: 'AU', count: 4},
     {country: 'ES', count: 2},
     {country: 'FR', count: 3},
     {country: 'MX', count: 3},
     {country: 'IE', count: 2},
     {country: 'NL', count: 1},
     {country: 'SN', count: 1},
     {country: 'AR', count: 1},
     {country: 'NZ', count: 1},
     {country: 'JM', count: 1},
     {country: 'NO', count: 1}
 ]
 

function ProviderArtists() {
return (
   <Container fluid="md" className='mb-5'>
       <Row style={{ width: "100%", height: 600 }}>
           <h3 className="p-5 text-center" style={{ color:"#0d1538" }}>Artists Count by Country</h3>
           <Col>
               <ResponsiveContainer width="100%" height="100%">
                   <BarChart
                       width={500}
                       height={300}
                       data={data}
                       margin={{
                           top: 5,
                           right: 50, // Increased right margin to provide space for x-axis labels
                           left: 50, // Increased left margin to provide space for y-axis labels
                           bottom: 5,
                       }}
                   >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="country" stroke="#0d1538" angle={-45} textAnchor="end" interval={0} height={80} />                            
                       <YAxis stroke="#0d1538" /> 
                       <ReferenceLine y={52919.29} stroke="#0d1538" />
                       <Tooltip />
                       <Legend />
                       <Bar dataKey="count" fill="#0d1538" />
                   </BarChart>
               </ResponsiveContainer>
           </Col>
       </Row>
   </Container>
);
}

export default ProviderArtists