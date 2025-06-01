// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <h5>About Polizo</h5>
            <p>Secure your future with us. Trusted insurance partner since 2000.</p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
             
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: polizo@gmail.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Insurance St, NY</p>
            <div>
              <a href="#" className="text-light me-3"><FaFacebook /></a>
              <a href="#" className="text-light me-3"><FaTwitter /></a>
              <a href="#" className="text-light me-3"><FaInstagram /></a>
              <a href="#" className="text-light"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <div className="text-center small">&copy; {new Date().getFullYear()} Polizo. All rights reserved.</div>
      </Container>
    </footer>
  );
};

export default Footer;
