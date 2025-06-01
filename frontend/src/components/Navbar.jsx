// src/components/Navbar.jsx
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={user ? "/dashboard" : "/"}>POLIZO</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

              {/* Agent-specific views */}
              {user.role === 'agent' && (
                <>
                  <Nav.Link as={Link} to="/policies">All Policies</Nav.Link>
                  <Nav.Link as={Link} to="/policies/my">My Created Policies</Nav.Link>
                  <Nav.Link as={Link} to="/policies/create">Create Policy</Nav.Link>
                  <Nav.Link as={Link} to="/claims">All Claims</Nav.Link>
                </>
              )}

              {/* Customer-specific views */}
              {user.role === 'customer' && (
                <>
                 <Nav.Link as={Link} to="/policies">All Policies</Nav.Link>
                  <Nav.Link as={Link} to="/claims">All Claims</Nav.Link>
                  <Nav.Link as={Link} to="/claims/my">My Claims</Nav.Link>
                  <Nav.Link as={Link} to="/claims/submit">Submit Claim</Nav.Link>
                </>
              )}
            </Nav>
          )}

          <Nav className="ms-auto">
            {user ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
