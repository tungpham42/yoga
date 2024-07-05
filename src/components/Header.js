import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const location = useLocation();

  const handleSelect = (eventKey) => {
    setSelectedKey(eventKey);
    localStorage.setItem("selectedKey", eventKey);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://yoga-api-nzy4.onrender.com/v1/categories"
        );
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories.");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedCategory = categories.find(
      (category) => `/${category.id}` === currentPath
    );
    if (matchedCategory) {
      setSelectedKey(matchedCategory.id);
      localStorage.setItem("selectedKey", matchedCategory.id);
    } else if (currentPath === "/") {
      setSelectedKey("0");
      localStorage.setItem("selectedKey", "0");
    }
  }, [location, categories]);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Yoga Poses
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav onSelect={handleSelect} activeKey={selectedKey}>
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <NavDropdown title="Poses Categories" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/" eventKey="0">
                  All Poses
                </NavDropdown.Item>
                {categories.map((category) => (
                  <NavDropdown.Item
                    eventKey={category.id}
                    key={category.id}
                    as={Link}
                    to={`/${category.id}`}
                  >
                    {category.category_name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
