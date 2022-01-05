import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getDetailOrderById } from "../../../core/apis/order";
import { formatCurrency } from "../../../core/utils/format";
import { useSelector } from "react-redux";
import { cancelOrder } from "../../../core/apis/order";
import { useHistory } from "react-router";
import ModalRating from "../../../base/Modal/ModalRating/ModalRating";
import { formatDate } from "../../../core/utils/format";
import './DetailOrder.scss'

const DetailOrder = ({isActive,setIsActive}) => {
    let { idOrder } = useParams()
    const [ curItem, setCurItem ] = useState('')
    const [ tempItem, setTempItem ] = useState('')
    const [ isAdd, setIsAdd ] = useState(true)
    const user = useSelector(state =>state.user.user)
    const history = useHistory()
    useEffect(async () => {
        await fecthDetailOrder()
        setIsActive(false)
        return () => {
            setIsActive(true)
        }
    }, [])
    console.log(curItem)
    const fecthDetailOrder = async () => {
        try {
            const res = await getDetailOrderById({
                orderId: idOrder
            })
            if(res && res.data.data !== []) 
            {
                setCurItem({
                    ...res.data.data._doc,
                    orderLog: res.data.data.orderLog
                })
            }
            else
            {

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        !curItem.feedbackId ? setIsAdd(true) : setIsAdd(false)
    }, [curItem.feedbackId])
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
    const onCanceledOrder = async (item) => {
        try {
            const res = await cancelOrder({
                orderId: item._id
            })
            if(res && res.data.result)
            {
                setCurItem({
                    ...curItem,
                    status : 'canceled'
                })
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const actionOrderComponent = (status) => {
        switch (status) {
            case 'pending':
                return(
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Bạn cần phải đợi chúng tôi xác nhận đơn hàng</span>
                        </div>
                        <div className="action-order-right">
                            <button onClick={() => onCanceledOrder(curItem)}
                            type="button" className="btn btn-primary">Hủy đơn hàng</button>
                        </div>
                    </div>
                )
            case 'processing':
                    return(
                        <div className="action-order">
                            <div className="action-order-left">
                                <span>Đơn hàng đang được chúng tôi thực hiện</span>
                            </div>
                            <div className="action-order-right">
                                <button onClick={() => onCanceledOrder(curItem)}
                                type="button" className="btn btn-primary">Hủy đơn hàng</button>
                            </div>
                        </div>
                    )
            case 'delivering':
                    return(
                        <div className="action-order">
                            <div className="action-order-left">
                                <span>Đơn hàng đang được chúng tôi thực hiện</span>
                            </div>
                            <div className="action-order-right">
                                <button onClick={() => onCanceledOrder(curItem)}
                                type="button" className="btn btn-primary">Hủy đơn hàng</button>
                            </div>
                        </div>
                    )
            case 'done':
                return(
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>{(!curItem.feedbackId) ? "Chưa được đánh giá" : "Cảm ơn bạn đã mua hàng"}</span>
                        </div>
                        <div className="action-order-right">
                            {
                                !!curItem.feedbackId && <button 
                                onClick={() => setTempItem(curItem)}
                                type="button" className="btn">Xem đánh giá</button>
                            }
                            {
                                !curItem.feedbackId ?
                                <button onClick={() => {
                                    setTempItem(curItem)
                                }}
                                type="button" className="btn btn-primary">Đánh giá đơn hàng</button>
                                :
                                <button 
                                type="button" className="btn btn-primary">Mua lại</button>
                            }
                        </div>
                    </div>
                )
            case 'canceled':
                return(
                    <div className="action-order">
                        <div className="action-order-left">
                            <span>Đơn hàng đã bị hủy bởi bạn</span>
                        </div>
                        <div className="action-order-right">
                            <button
                            type="button" className="btn btn-primary">Mua lại</button>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    useEffect(() => {
        if(!!tempItem?.feedbackId && !curItem.feedbackId)
        {
            setTempItem('')
            setCurItem({
                ...curItem,
                feedbackId: tempItem.feedbackId
            })
        }
    }, [tempItem.feedbackId])

    return(
        <>
        <ModalRating setOrder={setTempItem} order={tempItem} isAdd={isAdd}/>
        {
            (curItem === '') ?
            <div className="list-order-empty">
                {
                    !isActive && <h3>Không có đơn hàng nào được tìm thấy</h3>
                }
            </div>
            :
            <div className="order-detail">
                <div className="order-detail-top">
                    <div className="status-order">
                        <div className="infor-order-left">
                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                                <span onClick={() => {
                                    history.goBack(-1)
                                }}>TRỞ LẠI</span>
                        </div>
                        <div className="status-order-container">
                            <span className="id-order">ID ĐƠN HÀNG: {curItem._id}</span>
                            <span className="status-order-right">{handleStatusOrder(curItem.status)}</span>
                        </div>
                    </div>
                </div>
                <div className="j7z7l_">
                    <div className="_1AsWWl"></div>
                </div>
                <div className="order-dettail-address">
                    <h5>Địa chỉ nhận hàng</h5>
                    <div className="order-address-container">
                        <div className="order-detail-address-left">
                            <h6>{curItem.userDetailId.name}</h6>
                            <p>{curItem.userDetailId.phone}</p>
                            <p>{curItem.userDetailId.fullAddress}</p>
                            <h5>Chi nhánh thực hiện</h5>
                            <h6>{curItem.branchId.name}</h6>
                            <p>{curItem.branchId.address}</p>
                        </div>
                        <div className="order-detail-address-right">
                            <div className="step-container">
                                <div className="stepper-wrapper">
                                    {
                                        curItem.orderLog.map(item => (
                                            <div key={`orderLog${item._id}`} className="stepper-item completed">
                                                <div className="line-connect"></div>
                                                <div className="step-counter"></div>
                                                <div className="step-name">
                                                    <span>{formatDate(item.createdAt)}</span>
                                                </div>
                                                <span>{item.status}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-order-bottom">
                    <ul className="header-order-table">
                        <li>Sản phẩm</li>
                        <li>Tổng cộng</li>
                    </ul>
                    {
                        curItem.orderItemId.map(item => (
                            <div key={item._id} className="information-order">
                                <div className="infor-order-left">
                                    <div className="image-product-sample-container">
                                        <img src={item.productId.image} alt="image-product-smaple"></img>
                                    </div>
                                    <div className="detail-order-item-sample">
                                        <strong>{item.productId.name}</strong>
                                        <p>Mô tả: {item.description}</p>
                                        <span>x</span>
                                        <h5>{item.quantity}</h5>
                                    </div>
                                </div>
                                <div className="infor-order-right">
                                    <h5>{formatCurrency(item.total)}</h5>
                                </div>
                            </div>
                        ))
                    }
                    <div className="order-item-bottom">
                        <div className="total-order-container">
                            <div className="total-order-left">
                            </div>
                            <div className="total-order-right">
                                    <span>Tổng số tiền hàng</span>
                                    <span>{formatCurrency(curItem.totalPrice)}</span>
                            </div>
                        </div>
                        <div className="total-order-container ">
                            <div className="total-order-left">
                            </div>
                            <div className="total-order-right">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatCurrency(curItem.deliveryFee)}</span>
                            </div>
                        </div>
                        <div className="total-order-container ">
                            <div className="total-order-left">
                            </div>
                            <div className="total-order-right">
                                    <span>Tổng tiền phải trả</span>
                                    <span>{formatCurrency(curItem.realPrice)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="status-payment">
                        <svg height="16" width="16" viewBox="0 0 16 16" className="shopee-svg-icon _3CGIE_ "><g fillRule="evenodd"><path d="m8 15c-3.8596721 0-7-3.1397891-7-6.9994612 0-3.8602109 3.1403279-7.0005388 7-7.0005388 3.8602109 0 7 3.1403279 7 7.0005388 0 3.8596721-3.1397891 6.9994612-7 6.9994612z" fill="none" strokeWidth="1" stroke="currentColor"></path><path d="m10.4132188 9.3999583h-5.050999c-.204396 0-.3841766-.1081321-.4918691-.297583-.0404396-.0712089-.1556047-.3239567.0413188-.6303309.0694507-.1248354.1643959-.2835171.2738467-.4593416.1050552-.1701102.1969235-.3371435.2791214-.5112098.086154-.1789015.1617586-.3705502.2259345-.5709901.0553847-.1771432.0839562-.3674733.0839562-.5652758 0-.2738467.0404396-.5287923.1204398-.7556059.075165-.2197807.1797806-.4193415.3098907-.5934078.125275-.1674729.2747258-.3151655.4457152-.4382426.1397805-.0989013.2826379-.1775828.4276932-.2369235.6247463-.29029 1.6628604-.0523078 1.6487945.0083517.1424179.0589012.2707698.1279123.3890118.2096707.1767036.1217585.333627.2747258.4646163.4540668.1283519.1784619.2312092.3810997.3050556.6013199.0760441.2232971.1147255.4738471.1147255.7437377 0 .1912092.0281319.3802205.0848353.5626385.0637364.2052751.1397805.3995612.2268136.5780231.0887914.1850553.1832971.3542864.2821984.5050559.1046156.1604399.1982421.297583.2826379.4123085.0874727.1160442.1296706.2505499.122198.3876931-.0061539.1107695-.0404396.2162642-.0989013.3041764-.0562639.0870331-.1305497.1591212-.2101103.2026378-.0685716.0404396-.1665937.0892309-.2769236.0892309zm-3.9906114.7572683h3.0423323c-.1878895.8170573-.6949449 1.2255859-1.5211662 1.2255859s-1.3332766-.4085286-1.5211662-1.2255859z" stroke="none" fill="currentColor"></path></g></svg>
                        {
                            curItem.typePayment === 'COD' ? <span>Vui lòng thanh toán <strong>{curItem.realPrice}₫</strong> khi nhận hàng.</span>
                            : <span>Bạn đã thanh toán <strong>{curItem.realPrice}₫</strong> qua dịch vụ <strong>{curItem.typePayment}</strong>.</span>
                        }
                    </div>
                    <div className="payment-method">
                        <div className="payment-method-right">
                                <span>Phương thức thanh toán</span>
                                {
                                    curItem.typePayment === 'COD' && <span>Thanh toán khi nhận hàng</span>
                                }
                                {
                                    curItem.typePayment === 'VNPAY' && <span>Thanh toán thông qua VNPAY</span>
                                }
                                {
                                    curItem.typePayment === 'PAYPAL' && <span>Thanh toán thông quan Paypal</span>
                                }
                                
                        </div>
                    </div>
                    {
                        actionOrderComponent(curItem.status)
                    }
                </div>
                
            </div>
        }
        </>
    )
}

export default DetailOrder