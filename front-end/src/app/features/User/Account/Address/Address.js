import React, { useState, useEffect } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import ModalEditAddress from "../../../../base/Modal/ModalEditAddress/ModalEditAddress";
import ConfirmDialog from '../../../../../utilities/Component/ConfirmDialog/ConfirmDialog'
import { getAllAddressUser, updateDefaultAddress, deleteAddressAPI } from "../../../../core/apis/user";

import './Address.scss'

const Address = ({setIsActive}) => {
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
                showConfirm && <ConfirmDialog onSave={() => deleteAddress(chooseItem)} show={showConfirm} setShow={setShowConfirm} title="Xóa địa chỉ giao hàng này ?" content="Bạn có thực sự muốn xóa địa chỉ giao hàng này không ?"/>
            }
            <Card.Header>
                <h4>Địa chỉ của tôi</h4>
                <Button onClick={e => {
                    e.preventDefault()
                    setChooseItem('')
                    setShow(true)
                }}>Thêm địa chỉ mới</Button>
            </Card.Header>
            <Card.Body>
                {
                    addressList.length === 0 && 
                    (
                        <div className="empty-address-list">
                            <h3>Chưa có địa chỉ nào được khởi tạo.</h3>
                        </div>
                    )
                }
                {
                    addressList.map(item => (
                        <Row key={"address"+item._id} className="">
                            <Col sm={9}>
                                <div className="name-user label">
                                        <Col sm={3}>
                                            <span>Họ và tên</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{item.name}</span>
                                            {
                                                 item.isDefault &&  <span className="type-address default">Mặc định</span>
                                            }
                                            {
                                                item.type === 'Home' && 
                                                <span className="type-address">Nhà riêng</span>
                                            }
                                            {
                                                item.type === 'Office' && 
                                                <span className="type-address">Văn phòng</span>
                                            }
                                            
                                        </Col>
                                </div>
                                <div className="phone-user label">
                                        <Col sm={3}>
                                            <span>Số điện thoại</span>
                                        </Col>
                                        <Col sm={8}>
                                            <span>{item.phone}</span>
                                        </Col>
                                </div>
                                <div className="address-user label">
                                        <Col sm={3}>
                                            <span>Địa chỉ</span>
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
                                    }}>Sửa</a>
                                    <a className="delete-address" onClick={e => {
                                        e.preventDefault()
                                        setChooseItem(item)
                                        setShowConfirm(true)
                                    }}>Xóa</a>
                                </div>
                                {
                                    !item.isDefault &&  
                                    <Button 
                                    onClick={()=> setDefaultAddress(item)}
                                    type="button">Thiết lập mặc định</Button>
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

export default Address