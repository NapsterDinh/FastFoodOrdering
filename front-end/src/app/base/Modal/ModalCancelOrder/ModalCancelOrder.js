import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { createFeedback } from '../../../core/apis/feedback'

import './ModalCancelOrder.scss'

function ModalCancelOrder({order, setOrder}) {
    const [ description, setDescription ] = useState('')
    const [ ishandling, setIsHandling ] = useState(false)
    const createFeedBack = async () => {
        setIsHandling(true)
        try {
            const res = await createFeedback({
                idOrder: order._id,
                rating: rate,
                feedback: description
            })
            if(res)
            {
                setOrder({
                    ...order,
                    feedbackId: res.data.data._id 
                })
            }
            setIsHandling(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
        show={order !== ''}
        size="md"
        backdrop="static"
        keyboard={false}
        onHide={() => setOrder('')}
        id = "modal-cancel-order"
        >
        <Modal.Header>
            <Modal.Title>{'Hủy đơn hàng'}</Modal.Title>
        </Modal.Header>
            <div className="modal-body">
                <div className="container">
                    <h6>Cho chúng tôi biết lí do bạn hủy đơn hàng: </h6>
                    <textarea 
                    onChange={(e) => setDescription(e.target.value.trim())}
                    rows={2}
                    >
                    </textarea>
                </div>
            </div>
            <Modal.Footer>
                <button className="btn" onClick={() => setOrder('')}>
                    Trở lại
                </button>
                <Button
                disabled={description === '' || ishandling}
                 onClick={() => createFeedBack()}>
                    Hoàn thành
                </Button>
            </Modal.Footer>
        </Modal>    
    );
}

export default ModalCancelOrder;
