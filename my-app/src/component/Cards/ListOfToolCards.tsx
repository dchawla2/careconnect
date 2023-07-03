import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { tool_data } from "../../data/ToolsData";
import ToolCards from "./ApiCards";

function ListOfToolCards() {
    return (
        <Container>
            <Row className="justify-content-center">
                {tool_data.map((data) => (
                    <Col>
                        <ToolCards
                            api_name={data.tool_name}
                            img={data.img}
                            text={data.text}
                            link={data.link}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListOfToolCards;
