// src/pages/ContactUs.jsx
import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Contact Polizo</h2>
      <p className="text-center text-muted mb-5">
        Have questions or need help? Reach out to us and we'll get back to you as soon as possible.
      </p>

      <Row>
        {/* Contact Info */}
        <Col md={5}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Get in Touch</Card.Title>
              <Card.Text>
                <strong>Email:</strong> support@polizo.com <br />
                <strong>Phone:</strong> +1 (123) 456-7890 <br />
                <strong>Address:</strong> 123 Insurance St, New York, NY 10001
              </Card.Text>
              <Card.Text>
                <strong>Working Hours:</strong><br />
                Monday – Friday: 9:00 AM – 6:00 PM<br />
                Saturday – Sunday: Closed
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group controlId="formSubject" className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject of your message" />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-4">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Type your message here..." />
                </Form.Group>

                <Button variant="primary" type="submit">Send Message</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
