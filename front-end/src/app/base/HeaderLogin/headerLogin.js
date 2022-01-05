import React, { useState, useEffect, useRef } from 'react'
import { Container , Row, Col, Dropdown, Image } from 'react-bootstrap'
import { useIntl } from 'react-intl';

import messages from '../../core/msg/header.js';
import {Link} from "react-router-dom";

import './headerLogin.scss'

function HeaderLogin(props)
{
    const { formatMessage } = useIntl();

    const { pagination } = props

    return (
        <header id="header" className="light header-login">
                <Container className="header-container-inner">
                    <Row>
                        <Col md="3">
                            <div className="module module-logo dark">
                                <a href="/">
                                    <img src="/logo-light.svg" alt="" width="88"></img>
                                </a>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="pagination-container">
                                <h3>
                                    {
                                        pagination === 'LOGIN' && "Login"
                                    }
                                    {
                                        pagination === 'REGISTER' && "Register"
                                    }
                                    {
                                        pagination === 'FORGOT PASSWORD' && "Forgot Password"
                                    }
                                    {
                                        pagination === 'RESET PASSWORD' && "Reset Password"
                                    }
                                </h3>
                            </div>
                            <div className="help-container">
                                <a className="link-to-help" href="/">Need to help ?</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
    )
}

export default HeaderLogin