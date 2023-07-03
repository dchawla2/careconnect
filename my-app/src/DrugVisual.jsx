     import Container from "react-bootstrap/Container";
     import Row from 'react-bootstrap/Row';
     import Col from 'react-bootstrap/Col';
     import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer} from 'recharts';

     const data = [
          {route: 'ORAL', count: 435},
          {route: 'INJECTION', count: 153},
          {route: 'TOPICAL', count: 55},
          {route: 'INTRAVENOUS', count: 33},
          {route: 'OPHTHALMIC', count: 22},
          {route: 'INHALATION', count: 16},
          {route: 'VAGINAL', count: 8},
          {route: 'SUBCUTANEOUS', count: 7},
          {route: 'TRANSDERMAL', count: 6},
          {route: 'INTRAMUSCULAR', count: 5},
          {route: 'RECTAL', count: 3},
          {route: 'DENTAL', count: 3},
          {route: 'N/A', count: 3}
          ]

    function DrugVisual() {
    return (
        <Container fluid="md" className='mb-5'>
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center" style={{ color:"#0d1538" }}>Drug route</h3>
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
                            <XAxis dataKey="route" stroke="#0d1538" angle={-45} textAnchor="end" interval={0} height={80} />                            
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

     export default DrugVisual;