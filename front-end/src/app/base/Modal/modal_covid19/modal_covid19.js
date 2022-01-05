import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import { Modal } from 'react-bootstrap'
import { userReducer } from '../../../../store/userReducer';

import './modal_covid19.scss'
import { useDispatch } from 'react-redux';

function ModalCovid19({user}) {
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(userReducer({
            type: 'SET_COVID_19',
            covid19: true
        }))
    }

    return (
        <Modal
            show={!user.covid19}
            size="lg"
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            id = "modal-covid"
            >
            <div className="modal-header modal-header-lg dark bg-dark">
                <div className="bg-image">
                    <img src="" alt=""></img>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}><i className="ti ti-close"></i></button>
            </div>
            <div className="modal-body">
                <h3>We are COVID-19 safe!</h3>
                <p>In sed massa tempus, dapibus est pulvinar, pellentesque tellus. Donec ultricies magna nec mauris ornare venenatis. Duis fermentum est diam, in molestie tellus venenatis id. In ut efficitur mi, vel hendrerit libero. Phasellus ac vulputate lorem, pharetra tempor leo. Fusce eu dui libero.</p>
                <button className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}><span>Ok, thanks!</span></button>
            </div>
        </Modal>   
    );
}

export default ModalCovid19;
