import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom";


import Button from 'react-bootstrap/Button'

function Navigation({ logout, username }) {

    const history = useHistory();

    function logging_out() {
        logout()
        history.push("/login")
    }


    return (
        <div className="background">
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                <Navbar.Brand className="me-auto">{username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-5">
                            <LinkContainer to={"/profile/" + username}>
                                <Nav.Link>My profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/find">
                                <Nav.Link>Find</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/chat">
                                <Nav.Link>Chat</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        
                        <Button className="ms-auto"
                            variant="btn btn-light"
                            onClick={logging_out}
                        >Log out
                        </Button>{' '}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
