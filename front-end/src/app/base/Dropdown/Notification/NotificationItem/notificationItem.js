import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { deleteNotificationByIdNotify, markAsRead } from '../../../../core/apis/notification'
import { deleteNotificationById } from '../../../../../store/notificationReducer'
import { formatDate } from '../../../../core/utils/format';

import './notificationItem.scss'

function NotificationItem(props) {
    let { notiItem, index, refreshList } = props;

    const dispatch =  useDispatch();

    const deleteNotification = async () => {
        let res = await deleteNotificationByIdNotify(notiItem._id);
        if (res && res.data.result) {
            //dispatch(deleteNotificationById(_id));
        } else {
            //setErr(res.data.msg);
        }
    }

    const markRead = async (e) => {
        e.stopPropagation();

        const res = await markAsRead({_id: notiItem._id});

        await refreshList();
    }

    return (
        <Dropdown.Item onClick={markRead} className={ !notiItem.isRead ? "unread" : ""}>
            <div className="notification-item-container">
                <div className="notification-image">
                    <img src={notiItem.image} alt=""></img>
                </div>
                <div className="notification-content">
                    <p>{notiItem.description}</p>
                    <span>{formatDate(notiItem.createdAt)}</span>
                    {/* <span className="delete-notification" onClick={deleteNotification}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </span> */}
                </div>
            </div>     
        </Dropdown.Item>
    );
}

export default NotificationItem;
