import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import illnessholder from "../../images/logos/illness_placeholder.png"
import Button from 'react-bootstrap/Button';
import { Highlight } from 'react-highlight-regex'
import '../../main.css'; // Update the import here

function IllnessCard(props) {
    const id = props.id;
    const img = props.img;
    const text = props.text
    const country = props.title
    const region = props.region
    const population = props.property2
    const year = props.property3
    const link = props.link
    const regex = props.regex

    function highlight(input) {
      if (regex != null && regex != '') {
        return <Highlight match={regex} text={input?input:""} />
      }
      return input
    }

  return (
    <Row xs={1} md={2} className="illness-cards"> 
    <div
      class = "container" 
      id = {id}
      style={{ width: '18rem' }}>

      <div class='box'>
        <div class="image-container">
          <img class="holder" src={img} ></img>
        </div>
        <div> 
          <strong>{highlight(text)} </strong>
          <p>Region: {highlight(region)}</p>
          <p>Country: {highlight(country)}</p>
          <p>Estimated Cases: {highlight(population)} </p>
          <p>Year: {highlight(year)}</p>
        </div>
        <a href={link} class="more-info" role="button">More Info</a>
      </div>
    </div>
    </Row>
  );
}
export default IllnessCard;