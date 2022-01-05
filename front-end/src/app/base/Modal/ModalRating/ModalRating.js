import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { createFeedback } from '../../../core/apis/feedback'

import './ModalRating.scss'

function ModalRating({order, setOrder, isAdd}) {
    const [ rate, setRate ] = useState(0);
    const [ description, setDescription ] = useState('')
    const [ ishandling, setIsHandling ] = useState(false)
    console.log(rate)
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

    useEffect(() => {
        if(!!order.feedbackId)
        {
            setRate(order.feedbackId.rating)
            setDescription(order.feedbackId.feedback)
        }
    }, [order])
    return (
        <Modal
        show={order !== ''}
        size="md"
        backdrop="static"
        keyboard={false}
        onHide={() => setOrder('')}
        id = "modal-rating"
        >
        <Modal.Header>
            <Modal.Title>{'Đánh giá đơn hàng'}</Modal.Title>
        </Modal.Header>
            <div className="modal-body">
                <div className="container">
                    <h6>Đánh giá đơn hàng: </h6>
                    {[...Array(5)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                        <label key={`rating${index}`}>
                            <input
                            className="rating radio"
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating);
                            }}
                            />
                            <div className="rating">
                            {
                                givenRating < rate || givenRating === rate
                                ? (<i className="fa fa-star" aria-hidden="true"></i>)
                                : (<i className="fa fa-star-o" aria-hidden="true"></i>)
                            }
                            </div>
                        </label>
                        );
                    })}
                    <h6>Cho chúng tôi biết nhận xét của bạn về dịch vụ: </h6>
                    <textarea 
                    value={description}
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
                {
                    isAdd && 
                    <Button
                        disabled={rate=== 0 || description === '' || ishandling}
                        onClick={() => createFeedBack()}>
                            Hoàn thành
                    </Button>
                }
            </Modal.Footer>
        </Modal>    
    );
}

export default ModalRating;
