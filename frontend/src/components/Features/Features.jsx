import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Features.css'

function Features ({ featureSvg, cardTitle, cardBody }) {
  return (
     <Col xs={12} md={4} className='my-3'>
      <Card className="p-2 featureCard">
        <Card.Img className='my-2 mt-4 featureImg' variant="top" src={featureSvg} />
        <Card.Body>
          <Card.Title className='my-2 cardTitle'>{cardTitle}</Card.Title>
          <Card.Text className='cardBody'>{cardBody}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Features;
