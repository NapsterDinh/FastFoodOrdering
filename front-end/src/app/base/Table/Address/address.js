import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";

import ModalEditAddress from '../../Modal/ModalEditAddress/ModalEditAddress';

import './address.scss'

export const Address = ({addressList, setAddressList, setOrder, order}) => 
{
    const { formatMessage } = useIntl();
    const [ isStateChange, setIsStateChange ] = useState(true) 
    const [ isOnlyShow, setIsOnlyShow ] = useState(true)
    const [ chooseItem, setChooseItem ] = useState(addressList.filter(item => item.isDefault)[0])
    const [ showAddNew, setShowAddNew ] = useState(false)
    return (    
        <div className="_1gkIPw">
            <div className="_1TKMuK">
                <div className="_20Qrq_">
                    <div className="_2t2xOY">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                    <h4>Địa chỉ nhận hàng</h4>
                </div>
                {
                    !isOnlyShow && 
                    <div className="WtRfuB">
                            <button className="btn stardust-button _3kjQa7" onClick={()=>setShowAddNew(true)}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                Thêm địa chỉ mới
                            </button>
                            <a className="_21EQQZ" href="user/account/address">
                                <button className="btn stardust-button checkout-address-selection__manage-btn">Thiết lập địa chỉ</button>
                            </a>
                        </div>
                }
                {
                    isOnlyShow && 
                    <>
                    {
                        chooseItem === undefined &&
                        <div className="WtRfuB">
                            <button className="btn stardust-button _3kjQa7" onClick={()=>setShowAddNew(true)}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                Thêm địa chỉ mới
                            </button>
                            <a className="_21EQQZ" href="user/account/address">
                                <button className="btn stardust-button checkout-address-selection__manage-btn">Thiết lập địa chỉ</button>
                            </a>
                        </div>
                    }
                    </>
                }
            </div>
            <div className="_1uZwoD">
                <div className={isOnlyShow ? "stardust-radio-group" : "stardust-radio-group block"} role="radiogroup">
                    {
                        isOnlyShow &&
                        <>
                        {
                            chooseItem !== undefined &&
                            <>
                            <div className="stardust-radio " tabIndex="0" role="radio" aria-checked="false">
                                    <div className="stardust-radio-justify" style={{visibility: 'hidden'}}> 
                                            <input 
                                            type="radio" defaultChecked={false} name="address" id="address1"></input>
                                    </div>
                                    <label htmlFor="address1">
                                            <div className="_3E850P">{chooseItem.name}
                                            <p>{chooseItem.phone}</p>
                                            </div>
                                            <div className="full-address-container">
                                                <span className="_2F7jaW">{chooseItem.fullAddress}</span>
                                                {
                                                    chooseItem.isDefault && <span className="default">MẶC ĐỊNH</span>
                                                }
                                            </div>
                                            
                                        </label>
                            </div>
                            <span className="change" onClick={() => setIsOnlyShow(false)}>THAY ĐỔI</span>
                            </>
                        }
                            
                        </>
                    }
                    {
                        showAddNew && <ModalEditAddress chooseItem={''} show={showAddNew} setShow={setShowAddNew} setAddressList={setAddressList}/>
                    }
                    {
                        !isOnlyShow &&
                        addressList.map((item, index) => (
                            <div key={"address"+item._id} className="stardust-radio " tabIndex="0" role="radio" aria-checked="false">
                            {
                                isStateChange && 
                                <div className="stardust-radio-justify"> 
                                    <input type="radio" 
                                    onChange={(e) => 
                                        setChooseItem(item)
                                    }
                                    checked={item._id === chooseItem._id} name="address" id={"address1"+index}></input>
                                </div>
                            }
                            <label htmlFor={"address1"+index}>
                                    <div className="_3E850P">{item.name}
                                        <p>{item.phone}</p>
                                    </div>
                                    <div className="full-address-container">
                                        <span className="_2F7jaW">{item.fullAddress}</span>
                                        {
                                            item.isDefault && <span className="default">MẶC ĐỊNH</span>
                                        }
                                        {
                                            item.type === 'Home' && <span className="default type">NHÀ RIÊNG</span>
                                        }
                                        {
                                            item.type === 'Office' && <span className="default type">CƠ QUAN</span>
                                        }
                                    </div>
                                </label>
                            </div>
                        ))
                    }
                </div>
                {
                    !isOnlyShow && 
                    <div className="_1JeHlf">
                        <button className="btn stardust-button btn-primary"
                        onClick={() => {
                            console.log(order)
                            setOrder({
                                ...order,
                                idUserDetail: {...chooseItem},
                                latitude: chooseItem.latitude,
                                longitude: chooseItem.longitude
                            })
                            setIsOnlyShow(true)
                        }}
                        >Hoàn thành</button>
                        <button className="btn stardust-button " onClick={() => setIsOnlyShow(true)}>Trở Lại</button>
                    </div>
                }
                
            </div>
            <div></div>
        </div>
    )
}

export default Address