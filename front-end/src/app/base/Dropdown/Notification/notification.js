import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import NotificationItem from './NotificationItem/notificationItem';
import { useDispatch, useSelector } from "react-redux";
import { loadingNotifications } from '../../../../store/notificationReducer';
import LoadingOverlay from 'react-loading-overlay';
import { getListNotificationByIdUser, markAsReadAll } from "../../../core/apis/notification";
import { isEmpty } from 'lodash'

import './notification.scss'

const Notification = (props) => {
    const dispatch =  useDispatch();
    const [list, setList] = useState([])
    const [ isActive, setIsActive ] = useState(false)

    const refreshList = async () => {
        setIsActive(true)
        try {
            let res = await getListNotificationByIdUser();
            if (res && res.data.result) {
                // dispatch(loadingNotifications(res.data.data));
                setList(res.data.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsActive(false)
        }
    }

    const readAll = async () => {
        const res = await markAsReadAll();

        await refreshList();
    }

    return (
        <div className="notification-container">
            <Dropdown onClick={refreshList}  className="notification module">
                <Dropdown.Toggle variant="success" id="drop-down-notification">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    {/* <span>0</span> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div className="notification-header">
                        <span>Notification</span>
                        <span onClick={readAll} className="setting">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <p>Mask all as read</p>
                    </div>
                    {list.map((item, index ) => (
                        <NotificationItem key={index} index={index} notiItem={item} refreshList={refreshList}/>
                    ))}

                    <LoadingOverlay
                        active={isActive}
                        spinner
                        text='Loading notifications...'
                        >
                    </LoadingOverlay>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Notification;
