import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';


function ToolCard(props: any) {
    let id = props.id;
    let api_name = props.tool_name;
    let img = props.img;
    let text = props.text;
    let link = props.link;

    return (
        <Container style={{ width: "100%", marginTop: 150 }}>
            <Row xs={1} md={2} className="g-4">
                <Card className="card-5" id={id} style={{ width: '18rem' }}>

                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title className="text-center">{api_name}</Card.Title>
                        <Card.Img variant="top" src={img} />
                        <ListGroup className="list-group-flush text-center">
                            <ListGroup.Heading>{api_name}</ListGroup.Title>
                            <ListGroup.Item>{text}</ListGroup.Item>
                            <ListGroup.Item> <Card.Link href={link}>More Info</Card.Link></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Row>
        </Container >
    );
}

export default ToolCard;
