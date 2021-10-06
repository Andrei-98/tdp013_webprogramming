import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom";


import Button from 'react-bootstrap/Button'

function Navigation({ logout }) {

    const history = useHistory();

    function logging_out() {
        logout()
        history.push("/login")
    }


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Epic name</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto parent">
                            <LinkContainer to="/profile">
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/find">
                            <Nav.Link>Find</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/chat">
                                <Nav.Link>Chat</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Button variant="outline-danger" onClick={logging_out}>Log out</Button>{' '}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
