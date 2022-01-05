import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userReducer } from '../../../../store/userReducer';
import { getTokenReducer } from '../../../../store/getTokenReducer';
import { todoProduct } from '../../../../store/cartReducer';
import { updateRoomId, updateTotalPrice } from '../../../../store/appReducer';
import configuration from '../../../../configuration';

import './profile.scss'

function ProfileDropDown(props) {

    let { loginedUser } = props

    const { ApiUrl } = configuration;

    const dispatch = useDispatch();
    const history = useHistory();

    const { formatMessage } = useIntl();

    const logOut = () => {
        const roomId = (window.location.href.split('/')[5] && 
        window.location.href.split('/')[5]?.length > 20) ?
        window.location.href.split('/')[5] : null; 

        dispatch(userReducer(""));
        dispatch(getTokenReducer(""));
        dispatch(todoProduct({
            type: 'CLEAR_CART_LOG_OUT'
        }))

        if (!roomId) {
            dispatch(updateRoomId(""))
        }
        dispatch(updateTotalPrice(""))
        localStorage.clear()

        window.location.href = '/login'
    }

    const goToPage = (url) => {
        history.replace(url)
    }

    return (
        <div className="profile-container">
            <Dropdown className="profile module">
                <Dropdown.Toggle variant="success" id="drop-down-profile">
                    <Image src={loginedUser.avatar} roundedCircle />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div className="name-user">
                        <span>{loginedUser.name}</span>
                        <span>{loginedUser.email}</span>
                    </div>
                    <Dropdown.Item onClick={() => goToPage('/user/account/profile')}>Edit profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => goToPage('/user/purchase/online')}>Order History</Dropdown.Item>
                    <Dropdown.Item>Setting</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ProfileDropDown;
