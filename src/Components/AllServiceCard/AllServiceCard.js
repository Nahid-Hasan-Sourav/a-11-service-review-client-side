import React from 'react';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

const AllServiceCard = ({services}) => {
    return (
      <Col lg={6}>
        <Card classsName="shadow-lg">
      <PhotoProvider>
      <PhotoView src={services.imgUrl}>
      <Card.Img
            variant="top"
            src={services.imgUrl}
            style={{ height: "280px" }}
            className="img-fluid"
          />
      </PhotoView>
    </PhotoProvider>
          
          <Card.Body>
            <Card.Title className="fw-bold">{services.name}</Card.Title>
            <Card.Text>{services.description.slice(0, 100)}...</Card.Text>
            <Card.Text className="">
              {/* {
                count>0 ? services.price:""
             } */}
              <span className="fw-bold">Price : </span>
              {services.price}$
            </Card.Text>
            <Button
              variant="danger"
              className="ms-auto d-block fw-bold"
              as={Link}
              to={`/services/${services._id}` }
            >
             View Details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
};

export default AllServiceCard;