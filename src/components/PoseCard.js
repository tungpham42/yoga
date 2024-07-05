import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PoseCard = ({ pose }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        className="mb-3 shadow-lg"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant="top" src={pose.url_svg} alt={pose.pose_benefits} />
        <Card.Body className="text-center">
          <Card.Title>{pose.english_name}</Card.Title>
          <Card.Text>{pose.sanskrit_name}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {pose.english_name + " - " + pose.sanskrit_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={pose.url_svg}
            alt={pose.pose_benefits}
            className="img-fluid mb-3"
          />
          <h3>Benefits:</h3>
          <p>{pose.pose_benefits}</p>
          <h3>Description:</h3>
          <p>{pose.pose_description}</p>
          <h4>Translation:</h4>
          <p>{pose.translation_name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

PoseCard.propTypes = {
  pose: PropTypes.shape({
    english_name: PropTypes.string.isRequired,
    sanskrit_name: PropTypes.string.isRequired,
    url_svg: PropTypes.string.isRequired,
    pose_benefits: PropTypes.string.isRequired,
    pose_description: PropTypes.string.isRequired,
    translation_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoseCard;
