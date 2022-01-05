import React, { useState, useEffect, useRef } from 'react'
import { Container ,Navbar as NavbarBoostrap, Nav, NavDropdown, Row, Col, Image } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom'
import messages from '../../core/msg/header';
import './navbar.scss'

const Navbar = () => {
    const { formatMessage } = useIntl();
    const history = useHistory();

    const goToPage = (url) => {
        history.replace(url)
    }

    return (
        <nav className="module module-navigation left mr-4">
            <NavbarBoostrap expand="lg" className="nav nav-main">
                <Container>
                    <NavbarBoostrap.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarBoostrap.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <Nav.Link onClick={() => goToPage('/')}>{formatMessage(messages.nav_Home)}</Nav.Link>
                        <Nav.Link href="#about">{formatMessage(messages.nav_About)}</Nav.Link>
                        <NavDropdown title={formatMessage(messages.nav_Menu)} id="dropdown-menu">
                            <div className="dropdown-mega">
                                <div className="nav-dropdown-item">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </div>
                            </div>
                            <div className="dropdown-image">
                                <img src="/dropdown-about.jpg" alt=""></img>
                            </div>
                        </NavDropdown>
                        <Nav.Link href="#offer">{formatMessage(messages.nav_Offers)}</Nav.Link>
                        <Nav.Link href="#contact">{formatMessage(messages.nav_Contact)}</Nav.Link>
                        <NavDropdown title={formatMessage(messages.nav_More)} id="dropdown-more">
                            <div className="dropdown-mega">
                                <div className="nav-dropdown-item">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </div>
                            </div>
                            <div className="dropdown-image">
                                <img src="/dropdown-about.jpg" alt=""></img>
                            </div>
                        </NavDropdown>
                    </Nav>
                    </NavbarBoostrap.Collapse>
                </Container>
            </NavbarBoostrap>
        </nav>
    )
}

export default Navbar