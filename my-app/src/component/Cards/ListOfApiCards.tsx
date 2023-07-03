import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { api_data } from "../../data/ApiData";
import ApiCard from "./ApiCards";

function ListOfApiCards() {
    return (
        <Container>
            <Row  >
                {api_data.map((data) => (
                    <Col>
                        <ApiCard
                            api_name={data.api_name}
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

export default ListOfApiCards;
