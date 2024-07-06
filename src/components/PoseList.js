import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import PoseCard from "./PoseCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const PoseList = ({ catID = "0" }) => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { catID: paramCatID } = useParams();
  const activeCatID = paramCatID || catID;

  const setEqualHeight = (selector, offset = 0) => {
    const elements = document.querySelectorAll(selector);
    let maxHeight = 0;

    elements.forEach((element) => {
      element.style.height = ""; // Reset height to recalculate properly
      const elementHeight = element.getBoundingClientRect().height;
      maxHeight = Math.max(maxHeight, elementHeight);
    });

    elements.forEach((element) => {
      element.style.height = `${maxHeight + offset}px`;
    });
  };

  useEffect(() => {
    const fetchPoses = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint =
          activeCatID === "0" ? "poses" : `categories?id=${activeCatID}`;
        const { data } = await axios.get(
          `https://yoga-api-nzy4.onrender.com/v1/${endpoint}`
        );

        if (activeCatID === "0") {
          setPoses(Array.isArray(data) ? data : []);
          setCategoryName("All Poses");
        } else {
          setPoses(Array.isArray(data.poses) ? data.poses : []);
          setCategoryName(data.category_name || "Category");
        }
      } catch (err) {
        setError("Failed to fetch poses.");
        console.error("Error fetching poses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoses();
  }, [activeCatID]);

  useEffect(() => {
    const handleResize = () => {
      setEqualHeight(".card-title", 0);
      setEqualHeight(".card-text", 0);
    };

    window.addEventListener("resize", handleResize);
    setEqualHeight(".card-title", 0);
    setEqualHeight(".card-text", 0);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [poses]);

  return (
    <>
      <Helmet>
        <title>Yoga Poses</title>
        <meta name="description" content="Yoga Poses" />
      </Helmet>
      {loading && <Spinner animation="border" variant="light" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <h1 className="mb-3 text-center">{categoryName}</h1>
        <Row>
          {poses.length > 0
            ? poses.map((pose) => (
                <Col lg={4} md={6} sm={12} key={pose.id} className="pose-card">
                  <PoseCard pose={pose} />
                </Col>
              ))
            : !loading && <p>No poses available</p>}
        </Row>
      </Container>
    </>
  );
};

export default PoseList;
