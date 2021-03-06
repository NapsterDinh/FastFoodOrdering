import React, { useState, useEffect } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import ModalEditAddress from "../../../../base/Modal/ModalEditAddress/ModalEditAddress";
import ConfirmDialog from '../../../../../utilities/Component/ConfirmDialog/ConfirmDialog'
import { getAllAddressUser, updateDefaultAddress, deleteAddressAPI } from "../../../../core/apis/user";

import './TakeAwayOrder.scss'

const TakeAwayOrder = ({setIsActive}) => {
    const [ show, setShow ] = useState(false)
    const [ showConfirm, setShowConfirm ] = useState(false)
    const [ addressList , setAddressList ] = useState([])
    const [ chooseItem, setChooseItem ] = useState('')
    useEffect(() => {
        const fetchListAddress = async () => {
            try {
                const res = await getAllAddressUser()
                if(res && res.data.result)
                {
                    await setAddressList(res.data.data)
                }
                else
                {
                    console.log(res.data.msg)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchListAddress()
        setIsActive(false)
        return () => {
            setIsActive(true)
        }
    }, [])
    const setDefaultAddress = async (item) => {
        setIsActive(true)
        try {
            const res = await updateDefaultAddress(item._id)
            if(res && res.data.result)
            {
                setAddressList(res.data.data)
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
        setIsActive(false)
    }

    const deleteAddress = async (item) => {
        try {
            const res = await deleteAddressAPI(item._id)
            if(res && res.data.result)
            {
                setAddressList(res.data.data)
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
        setShowConfirm(false)
    }

    return(
        <>
        <Card>
            {
                show && <ModalEditAddress chooseItem={chooseItem} show={show} setShow={setShow} setAddressList={setAddressList}/>
            }
            {
                showConfirm && <ConfirmDialog onSave={() => deleteAddress(chooseItem)} show={showConfirm} setShow={setShowConfirm} title="X??a ?????a ch??? giao h??ng n??y ?" content="B???n c?? th???c s??? mu???n x??a ?????a ch??? giao h??ng n??y kh??ng ?"/>
            }
            <Card.Header>
                <h4>?????a ch??? c???a t??i</h4>
                <Button onClick={e => {
                    e.preventDefault()
                    setChooseItem('')
                    setShow(true)
                }}>Th??m ?????a ch??? m???i</Button>
            </Card.Header>
            <Card.Body>
                {
                    addressList.length === 0 && 
                    (
                        <div className="empty-address-list">
                            <h3>Ch??a c?? ?????a ch??? n??o ???????c kh???i t???o.</h3>
                        </div>
                    )
                }
                {
                    addressList.map(item => (
                        <Row key={"address"+item._id} className="">
                            <Col sm={9}>
                                <div className="name-user label">
                                        <Col sm={3}>
                                            <span>H??? v?? t??n</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{item.name}</span>
                                            {
                                                 item.isDefault &&  <span className="type-address default">M???c ?????nh</span>
                                            }
                                            {
                                                item.type === 'Home' && 
                                                <span className="type-address">Nh?? ri??ng</span>
                                            }
                                            {
                                                item.type === 'Office' && 
                                                <span className="type-address">V??n ph??ng</span>
                                            }
                                            
                                        </Col>
                                </div>
                                <div className="phone-user label">
                                        <Col sm={3}>
                                            <span>S??? ??i???n tho???i</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{item.phone}</span>
                                        </Col>
                                </div>
                                <div className="address-user label">
                                        <Col sm={3}>
                                            <span>?????a ch???</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{item.fullAddress}
                                            </span>
                                        </Col>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className='address-action'>
                                    <a className="edit-address" onClick={e => {
                                        e.preventDefault()
                                        setChooseItem(item)
                                        setShow(true)
                                    }}>S???a</a>
                                    <a className="delete-address" onClick={e => {
                                        e.preventDefault()
                                        setChooseItem(item)
                                        setShowConfirm(true)
                                    }}>X??a</a>
                                </div>
                                {
                                    !item.isDefault &&  
                                    <Button 
                                    onClick={()=> setDefaultAddress(item)}
                                    type="button">Thi???t l???p m???c ?????nh</Button>
                                }
                            </Col>
                        </Row>
                    ))
                }
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
        </>
    )
}

export default TakeAwayOrder