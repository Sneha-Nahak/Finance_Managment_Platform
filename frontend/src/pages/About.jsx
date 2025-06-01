// src/pages/About.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About InsuranceManagement System</h2>

      <Card className="mb-4">
        <Card.Body>
          <Card.Text>
            <strong>InsuranceManagement System</strong> is a backend-driven platform that helps insurance providers streamline policy administration, claim handling, and customer interactions. Designed with modern technologies, it enables both agents and customers to efficiently manage insurance operations.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <h4>Core Features</h4>
          <ul>
            <li>Secure login & registration with JWT</li>
            <li>Role-based access for agents & customers</li>
            <li>Policy creation, editing, and search</li>
            <li>Claim filing, tracking & document upload</li>
            <li>Profile & transaction management</li>
            <li>Smart notifications and alerts</li>
          </ul>
        </Col>

        <Col md={6}>
          <h4>Unique Highlights</h4>
          <ul>
            <li>AI-powered claim fraud detection</li>
            <li>Personalized policy recommendation engine</li>
            <li>Customer support ticket system</li>
            <li>Integrated chatbot assistance</li>
            <li>Loyalty and discount programs</li>
            <li>Agent analytics and reporting tools</li>
          </ul>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Text>
            Whether you're an insurance company or a tech team supporting one, <strong>InsuranceManagement</strong> offers a secure, scalable, and intelligent solution tailored to the evolving needs of the insurance industry.
          </Card.Text>
          <Card.Text className="text-muted text-end">
            &copy; {new Date().getFullYear()} InsuranceManagement. All rights reserved.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
