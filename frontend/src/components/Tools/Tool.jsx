import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; 
import './Tool.css';

function Tool({ toolSvg, name, toolHref }) {
  return (
    <Link to={`/${toolHref}`} className="card-link">
      <Card className='tools'>
        <Card.Body>
          <img src={toolSvg} className="card-img-top my-3" alt="SVG" style={{ width: '30%', margin: 'auto' }} />
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Tool;
