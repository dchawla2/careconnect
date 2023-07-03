import Card from 'react-bootstrap/Card';
// import Drug from "../../images/drug.png";

import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Highlight } from 'react-highlight-regex';


import { Link } from 'react-router-dom'

function HealthProviderCard(props) {
    const id = props.id;
    const title = props.title;
    const text = props.text
    const property1 = props.property1
    const property2 = props.property2
    const property3 = props.property3
    const property4 = props.property4
    const image_url = props.image_url;
    const image_holder = props.image_holder;
    const regex = props.regex

  const handleImageError = (event) => {
      event.target.src = image_holder;
  }

  function highlight(input) {
    if (regex != null && regex != '') {
      return <Highlight match={regex} text={input?input:""} />
    }
    return input
  }

  return (
     <Row xs={1} md={2} className="g-4">
      <div
      class = "container" id = {id} style={{ width: '18rem' }}
    >
      <div class='box'>
      <div class="image-container">
      <img class="holder" src={image_url} onError={handleImageError}></img>
      </div>
        <div> 
          <strong>{highlight(title)} </strong>
          <p>Taxonomy: {highlight(property1)}</p>
          <p>Type: {highlight(property2)}</p>
          <p>NPI ID: {highlight(property3)}</p>
          <p>Address: {highlight(property4)}</p>
        </div>
        <a href={props.link} class="more-info" role="button">More Info</a>
      </div>
    </div>
    </Row>
  );
}
export default HealthProviderCard;