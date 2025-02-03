import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

function Header() {
    const [openMenu, setOpenMenu] = useState(false);
 
    return (
        <Navbar expand="lg" bg="brown" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Café do Amanhã</Navbar.Brand>
                <Navbar.Toggle 
                    aria-label='basic-navbar-nar'
                    onClick={() => setOpenMenu(!openMenu)}>
                         {openMenu ? 'X' : '☰'}
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Início</Nav.Link>
                        <Nav.Link as={Link} to="/sobre-nos">Sobre Nós</Nav.Link>
                        <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/pedidos">Pedidos</Nav.Link>
                        <Nav.Link as={Link} to="/historias">Histórias</Nav.Link>
                        <Nav.Link as={Link} to="/contato">Contato</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
