import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import { Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

import './ConfirmDialog.scss'
import Button from '@restart/ui/esm/Button';

function ConfirmDialog(props) {
    
    const { show, setShow, title, content, onSave } = props
   
    return (
        <Modal
            show={show}
            size="md"
            closeButton
            onHide={() => setShow(false)}
            id = "modal-confirm"
            >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn" onClick={() => setShow(false)}>
                    Trở lại
                </Button>
                <Button className="btn save" onClick={() => onSave()}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>   
    );
}

export default ConfirmDialog;
