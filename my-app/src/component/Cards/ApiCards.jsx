import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import "../../main.css";


function ApiCard(props) {
    let id = props.id;
    let api_name = props.api_name;
    let img = props.img;
    let text = props.text;
    let link = props.link;

    return (
        <Row xs={1} md={2} className="g-4">
        <div
            class="container" id={id} style={{ width: '18rem' }}
        >
            <div class='box-team-info'>
                <div class="image-container">
                    <img class="holder" src={img}></img>
                </div>
                <div>
                    <strong>{api_name}</strong>
                    <p>{text}</p>
                </div>
                <a href={link} class="more-info" role="button">More Info</a>
            </div>
        </div>
        </Row>

    );
}

export default ApiCard;
