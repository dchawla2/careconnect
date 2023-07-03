import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'; 
import { Link } from 'react-router-dom';
import { Highlight } from 'react-highlight-regex'
import DrugHolder from "../../images/logos/drug.png"
import '../../main.css';

function DrugsCard(props) {
    const id = props.id;
    const drug_name = props.drug_name;
    const image_url = props.image_url;
    const company_name = props.company_name
    const marketing_status = props.marketing_status
    const route = props.route
    const link = props.link
    const category = props.category
    const regex = props.regex

    const handleImageError = (event) => {
      event.target.src = DrugHolder;
  }

  function highlight(input) {
    if (regex != null && regex != '') {
      return <Highlight match={regex} text={input?input:""} />
    }
    return input
  }
  return (
    <div
    class="container"
    id={id}
    style={{ width: '18rem' }}
  >
    <div class="box">
      <div class="image-container">
        <img class="holder" src={image_url} onError={handleImageError}></img>
      </div>
      <div>
        <strong>{highlight(drug_name)} </strong>
        <p>Company: {highlight(company_name)} </p>
        <p>Marketing Status: {highlight(marketing_status)} </p>
        <p>Route: {highlight(route)}</p>
        <p>Category: {highlight(category)}</p>
      </div>
      <a href={link} class="more-info" role="button">More Info</a>
    </div>
  </div>
  
   
  );
}

export default DrugsCard;