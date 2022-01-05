import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';

import './cookiebar.scss'
import messages from '../../core/msg/header';
import { useDispatch } from 'react-redux';
import { userReducer } from '../../../store/userReducer'

function CookieBar({user}) {
    
    const { formatMessage } = useIntl();
    const dispatch = useDispatch()

    const onClickButton = () => {
        dispatch(userReducer({
            type: 'SET_ACCEPT_COOKIE',
            acceptCookie: true
        }))
    }

    return (
        <div id="cookies-bar" className={!user.acceptCookie ? "body-bar cookies-bar" : "body-bar cookies-bar hidden"}>
            <div className="body-bar-container container">
                <div className="body-bar-text">
                    <h4 className="mb-2">Cookies &amp; GDPR</h4>
                    <p>This is a sample Cookies / GDPR information. You can use it easily on your site and even add link to <a href="#">Privacy Policy</a>.</p>
                </div>
                <div className="body-bar-action">
                    <button className="btn btn-primary" data-accept="cookies" onClick={onClickButton} ><span>Accept</span></button>
                </div>
            </div>
        </div>
    );
}

export default CookieBar;
