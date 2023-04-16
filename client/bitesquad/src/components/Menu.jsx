import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import './bootstrap.min.css';

const MenuX = ({ changePageId }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Button onClick={() => {changePageId(0)}}>Home</Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ gap: '1rem' }}>
              <Nav.Link href="#home" onClick={() => {changePageId(1)}}>Login</Nav.Link>
              <Nav.Link href="#home" onClick={() => {changePageId(2)}}>Register</Nav.Link>
              <Nav.Link href="#link" onClick={() => {changePageId(3)}}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MenuX;
