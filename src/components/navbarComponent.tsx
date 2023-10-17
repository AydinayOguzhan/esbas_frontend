import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavbarComponent() {
  const navigate = useNavigate();

  return (
    <>

      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        {/* <Container> */}
          <Navbar.Brand className='ms-3'>Student System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>

    </>
  );
}

export default NavbarComponent;
