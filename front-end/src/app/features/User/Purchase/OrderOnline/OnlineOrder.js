import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getListOrder, cancelOrder } from '../../../../core/apis/order'
import ModalRating from "../../../../base/Modal/ModalRating/ModalRating";
import { formatCurrency } from "../../../../core/utils/format";
import { useHistory, useLocation } from "react-router";

import './OnlineOrder.scss'

const OnlineOrder = ({setIsActive, isActive, isOnlineOrder}) => {
    let { type1, type } = useParams()
    const [ orderList, setOrderList ] = useState('')
    const [ chooseItem, setChooseItem ] = useState('')
    const history =  useHistory()
    const location = useLocation()

    const fetchOrder =  async () => {
        try {
            const res = await getListOrder({
                type: type,
                status: type1
            })
            if(res && res.data.result)
            {
                setOrderList(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async() => {
        setIsActive(false)
        return () => {
            setIsActive(true)
        }
    }, [])

    useEffect(() => {
        console.log(orderList)
    }, [orderList])

    useEffect(async () => {
        await setOrderList('')
        setIsActive(true)
        await fetchOrder()
        setIsActive(false)
    }, [type1, type])

    useEffect(() => {
        if(!!chooseItem?.feedbackId && orderList !== '')
        {
            const index = orderList.findIndex(item => item._id === chooseItem._id)
            let temp = [...orderList]
            temp.splice(index, 1, chooseItem)
            setOrderList(temp)
            setChooseItem('')
        }
    }, [chooseItem.feedbackId])

    const pendingItem = (item, index) => {
        return(
            <li key={item._id+'orderItem'} className="order-item">
                <div className="status-order">
                    <div className="infor-order-left">
                            <span className="id-order">ID ĐƠN HÀNG: </span>
                            <span>{item._id}</span>
                    </div>
                    <div className="status-order-container">
                        <span className="status-order">{handleStatusOrder(item.status)}</span>
                    </div>
                </div>
                <div className="information-order">
                    <div className="infor-order-left">
                        <div className="image-product-sample-container">
                            <img src={item.orderItemId[0].productId.image} alt="image-product-smaple"></img>
                        </div>
                        <div className="detail-order-item-sample">
                            <strong>{item.orderItemId[0].productId.name}</strong>
                            <p>Mô tả: {item.orderItemId[0].productId.description}</p>
                            <span>x</span>
                            <h5>{item.orderItemId[0].quantity}</h5>
                        </div>
                    </div>
                    <div className="infor-order-right">
                        <h5>{formatCurrency(item.orderItemId[0].total)}</h5>
                    </div>
                </div>
                <div className="order-item-bottom">
                    <div className="total-order-container">
                        <div className="total-order-left">
                            {
                                item.orderItemId[0].quantity-1 > 0 && <span>và {item.orderItemId[0].quantity-1} sản phẩm</span>
                            }
                        </div>
                        <div className="total-order-right">
                                <span>Tổng số tiền</span>
                                <span>{formatCurrency(item.realPrice)}</span>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Bạn cần phải đợi chúng tôi xác nhận đơn hàng</span>
                        </div>
                        <div className="action-order-right">
                            <button 
                            onClick={() => openDetailOrder(item)}
                                type="button" className="btn">Xem chi tiết</button>
                            <button onClick={() => onCanceledOrder(item, index)}
                            type="button" className="btn btn-primary">Hủy đơn hàng</button>
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }
    
    const processingItem = (item, index) => {
        return(
            <li key={item._id+'orderItem'} className="order-item">
                <div className="status-order">
                    <div className="infor-order-left">
                            <span className="id-order">ID ĐƠN HÀNG: </span>
                            <span>{item._id}</span>
                    </div>
                    <div className="status-order-container">
                        <span className="status-order">{handleStatusOrder(item.status)}</span>
                    </div>
                </div>
                <div className="information-order">
                    <div className="infor-order-left">
                        <div className="image-product-sample-container">
                            <img src={item.orderItemId[0].productId.image} alt="image-product-smaple"></img>
                        </div>
                        <div className="detail-order-item-sample">
                            <strong>{item.orderItemId[0].productId.name}</strong>
                            <p>Mô tả: {item.orderItemId[0].productId.description}</p>
                            <span>x</span>
                            <h5>{item.orderItemId[0].quantity}</h5>
                        </div>
                    </div>
                    <div className="infor-order-right">
                        <h5>{formatCurrency(item.orderItemId[0].total)}</h5>
                    </div>
                </div>
                <div className="order-item-bottom">
                    <div className="total-order-container">
                        <div className="total-order-left">
                            {
                                item.orderItemId[0].quantity-1 > 0 && <span>và {item.orderItemId[0].quantity-1} sản phẩm</span>
                            }
                        </div>
                        <div className="total-order-right">
                                <span>Tổng số tiền</span>
                                <span>{formatCurrency(item.realPrice)}</span>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Đơn hàng đang được chúng tôi thực hiện</span>
                        </div>
                        <div className="action-order-right">
                            <button 
                            onClick={() => openDetailOrder(item)}
                                type="button" className="btn">Xem chi tiết</button>
                            <button onClick={() => onCanceledOrder(item, index)}
                            type="button" className="btn btn-primary">Hủy đơn hàng</button>
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }
    
    const deliveringItem = (item, index) => {
        return(
            <li key={item._id+'orderItem'} className="order-item">
                <div className="status-order">
                    <div className="infor-order-left">
                            <span className="id-order">ID ĐƠN HÀNG: </span>
                            <span>{item._id}</span>
                    </div>
                    <div className="status-order-container">
                        <span className="status-order">{handleStatusOrder(item.status)}</span>
                    </div>
                </div>
                <div className="information-order">
                    <div className="infor-order-left">
                        <div className="image-product-sample-container">
                            <img src={item.orderItemId[0].productId.image} alt="image-product-smaple"></img>
                        </div>
                        <div className="detail-order-item-sample">
                            <strong>{item.orderItemId[0].productId.name}</strong>
                            <p>Mô tả: {item.orderItemId[0].productId.description}</p>
                            <span>x</span>
                            <h5>{item.orderItemId[0].quantity}</h5>
                        </div>
                    </div>
                    <div className="infor-order-right">
                        <h5>{formatCurrency(item.orderItemId[0].total)}</h5>
                    </div>
                </div>
                <div className="order-item-bottom">
                    <div className="total-order-container">
                        <div className="total-order-left">
                            {
                                item.orderItemId[0].quantity-1 > 0 && <span>và {item.orderItemId[0].quantity-1} sản phẩm</span>
                            }
                        </div>
                        <div className="total-order-right">
                                <span>Tổng số tiền</span>
                                <span>{formatCurrency(item.realPrice)}</span>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Đơn hàng đang được chúng tôi vận chuyển</span>
                        </div>
                        <div className="action-order-right">
                            <button 
                            onClick={() => openDetailOrder(item)}
                                type="button" className="btn">Xem chi tiết</button>
                            <button type="button" className="btn btn-primary">Hủy đơn hàng</button>
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }
    
    const deliveriedItem = (item, index) => {
        return(
            <li key={item._id+'orderItem'} className="order-item">
                <div className="status-order">
                    <div className="infor-order-left">
                            <span className="id-order">ID ĐƠN HÀNG: </span>
                            <span>{item._id}</span>
                    </div>
                    <div className="status-order-container">
                        <div className="status-order-left">
                            <i className="fa fa-truck" aria-hidden="true"></i>
                            <span className="toggle-status-order">Giao hàng thành công</span>
                        </div>
                        <span className="status-order">{handleStatusOrder(item.status)}</span>
                    </div>
                </div>
                <div className="information-order">
                    <div className="infor-order-left">
                        <div className="image-product-sample-container">
                            <img src={item.orderItemId[0].productId.image} alt="image-product-smaple"></img>
                        </div>
                        <div className="detail-order-item-sample">
                            <strong>{item.orderItemId[0].productId.name}</strong>
                            <p>Mô tả: {item.orderItemId[0].productId.description}</p>
                            <span>x</span>
                            <h5>{item.orderItemId[0].quantity}</h5>
                        </div>
                    </div>
                    <div className="infor-order-right">
                        <h5>{formatCurrency(item.orderItemId[0].total)}</h5>
                    </div>
                </div>
                <div className="order-item-bottom">
                    <div className="total-order-container">
                        <div className="total-order-left">
                            {
                                item.orderItemId[0].quantity-1 > 0 && <span>và {item.orderItemId[0].quantity-1} sản phẩm</span>
                            }
                        </div>
                        <div className="total-order-right">
                                <span>Tổng số tiền</span>
                                <span>{formatCurrency(item.realPrice)}</span>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>{(!item.feedbackId) ? "Chưa được đánh giá" : "Cảm ơn bạn đã mua hàng"}</span>
                        </div>
                        <div className="action-order-right">
                            <button 
                            onClick={() => openDetailOrder(item)}
                                type="button" className="btn">Xem chi tiết</button>
                            {
                                !item.feedbackId ?
                                <button onClick={() => {
                                    setChooseItem(item)
                                }}
                                type="button" className="btn btn-primary">Đánh giá đơn hàng</button>
                                :
                                <button 
                                type="button" className="btn btn-primary">Mua lại</button>
                            }
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }
    
    const cancelItem = (item, index) => {
        return(
            <li key={item._id+'orderItem'} className="order-item">
                <div className="status-order">
                    <div className="infor-order-left">
                            <span className="id-order">ID ĐƠN HÀNG: </span>
                            <span>{item._id}</span>
                    </div>
                    <div className="status-order-container">
                        <span className="status-order">{handleStatusOrder(item.status)}</span>
                    </div>
                </div>
                <div className="information-order">
                    <div className="infor-order-left">
                        <div className="image-product-sample-container">
                            <img src={item.orderItemId[0].productId.image} alt="image-product-smaple"></img>
                        </div>
                        <div className="detail-order-item-sample">
                            <strong>{item.orderItemId[0].productId.name}</strong>
                            <p>Mô tả: {item.orderItemId[0].productId.description}</p>
                            <span>x</span>
                            <h5>{item.orderItemId[0].quantity}</h5>
                        </div>
                    </div>
                    <div className="infor-order-right">
                        <h5>{formatCurrency(item.orderItemId[0].total)}</h5>
                    </div>
                </div>
                <div className="order-item-bottom">
                    <div className="total-order-container">
                        <div className="total-order-left">
                            {
                                item.orderItemId[0].quantity-1 > 0 && <span>và {item.orderItemId[0].quantity-1} sản phẩm</span>
                            }
                        </div>
                        <div className="total-order-right">
                                <span>Tổng số tiền</span>
                                <span>{formatCurrency(item.realPrice)}</span>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Đơn hàng đã bị hủy bởi bạn</span>
                        </div>
                        <div className="action-order-right">
                            <button onClick={() => openDetailOrder(item)}
                            type="button" className="btn btn-primary">Xem chi tiết</button>
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }

    const onCanceledOrder = async (item, index) => {
        try {
            const res = await cancelOrder({
                orderId: item._id
            })
            if(res && res.data.result)
            {
                const temp = [...orderList]
                if(type1 === 'pending')
                {
                    temp.splice(index, 1)
                }
                else
                {
                    let chooseOrderItem = {...temp[index]}
                    chooseOrderItem = {
                        ...chooseOrderItem,
                        status : 'canceled'
                    }
                    console.log(chooseOrderItem)
                    temp.splice(index, 1, chooseOrderItem)
                    console.log(temp)
                }
                setOrderList(temp)
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatusOrder = (status) => {
        switch (status) {
            case 'pending':
                return('Chờ xác nhận')
            case 'processing':
                return('Đang thực hiện')
            case 'delivering':
                return('Đang vận chuyển')
            case 'done':
                return('Đã giao')
            case 'canceled':
                    return('Đã hủy')
            default:
                break;
        }
    }

    const openDetailOrder = (item) => {
        setIsActive(true)
        history.replace(`/user/purchase/${type}/id/` +item._id)
    }
    return(
        <>
        {
            (orderList.length === 0) && 
            <div className="list-order-empty">
                {
                    !isActive && <h3>Không có đơn hàng nào được tìm thấy</h3>
                }
            </div>
        }
        <ModalRating setOrder={setChooseItem} order={chooseItem} isAdd={true}/>
        {
            orderList !== '' && 
            <ul className="body-order-table">
                 {
                     orderList.map((item, index) => 
                        {
                            switch (item.status) {
                                case 'pending':
                                    return(
                                        pendingItem(item, index)
                                    )
                                case 'canceled':
                                    return(
                                        cancelItem(item, index)
                                    )
                                case 'processing':
                                    return(
                                        processingItem(item, index)
                                    )
                                case 'delivering':
                                    return(
                                        deliveringItem(item, index)
                                    )
                                case 'done':
                                    return(
                                        deliveriedItem(item, index)
                                    )
                                default:
                                    break;
                            }
                        }
                     )
                 }
             </ul>
        } 
        </>
    )
}




export default OnlineOrder