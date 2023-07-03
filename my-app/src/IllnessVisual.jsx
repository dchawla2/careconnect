import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { region: 'Americas', count: 698 },
    { region: 'Europe', count: 826 },
    { region: 'South-East Asia', count: 847 },
    { region: 'Western Pacific', count: 385 },
    { region: 'Africa', count: 1259 },
    { region: 'Eastern Mediterranean', count: 715 }
];

const COLORS = ['#0d1538'];

const IllnessVisual = () => {
    // Sort data array in ascending order based on count
    const sortedData = data.sort((a, b) => a.count - b.count);

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN); // Adjusted label position
        const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN); // Adjusted label position

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${sortedData[index].region} - ${sortedData[index].count}`}
            </text>
        );
    };

    return (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center" style={{ color: "#0d1538" }}>Illness Count by Region</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={500} height={500}>
                            <Pie
                                dataKey="count"
                                nameKey="region"
                                isAnimationActive={false}
                                data={sortedData} // Use sorted data array
                                cx="50%"
                                cy="50%"
                                outerRadius={[150, 250]} // Adjusted outerRadius to make the pie chart asymmetrical
                                labelLine={false}
                                label={renderLabel} // Custom label that includes region and count
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip /> {/* Tooltip to show count when hovering over pie chart */}
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default IllnessVisual;
