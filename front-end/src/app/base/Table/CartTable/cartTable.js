import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Col, Form } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import ConfirmDialog from '../../../../utilities/Component/ConfirmDialog/ConfirmDialog'
import { todoProduct } from '../../../../store/cartReducer';
import { updateCartItemAPI, removeFromCart } from '../../../core/apis/cart';
import { showNotification, type } from '../../../../utilities/Component/notification/Notification';
import { payment, paymentCOD, paymentPaypal } from '../../../core/apis/order'

import './cartTable.scss'
import { formatCurrency } from '../../../core/utils/format';

export const CartTable = ({order, setOrder}) => 
{
    const [ showConfirm, setShowConfirm ] = useState(false)
    const cart = useSelector(state => state.cart.cart)
    console.log(cart)
    const [ isHandling, setIsHandling ] = useState(false)
    const [ chooseItem, setChooseItem ] = useState('')
    const [ isChoosePaymentMethod, setIsChoosePaymentMethod ] = useState(true)
    const user = useSelector(state => state.user.user)
    const history = useHistory()
    const ref = useRef([])
    const refChooseAll = useRef(null)
    const dispatch = useDispatch()
    const isGuest =  new URLSearchParams(new URL(window.location.href).search).get('t')

    useEffect(() => {
        if(order.amount < cart.mount)
        {
            refChooseAll.current.checked = false
        }
        else
        {
            refChooseAll.current.checked = true
        }
    }, [order.amount])

    const updateAmount = async (isIncrease, currentItem) => 
    {
        setIsHandling(true)
        let temp = [...cart.cartItemId]
        let tempCart = ''
        let tempItem = ''
        const index = temp.findIndex(item => item._id === currentItem._id)
        if(isIncrease)
        {
            if(currentItem.quantity <= 19)
            {
                tempItem = {
                    ...currentItem,
                    quantity: currentItem.quantity + 1,
                    total: (currentItem.quantity + 1) * currentItem.price
                }
                tempCart = {
                        ...cart,
                        cartItemId: temp,
                        mount: cart.mount + 1,
                        totalPrice: cart.totalPrice + currentItem.price
                    }
                
            }
        }
        else
        {
            if(currentItem.quantity > 1)
            {
                tempItem = {
                    ...currentItem,
                    quantity: currentItem.quantity - 1,
                    total: (currentItem.quantity - 1) * currentItem.price
                }
                tempCart = {
                    ...cart,
                    cartItemId: temp,
                    mount: cart.mount - 1,
                    totalPrice: cart.totalPrice - currentItem.price
                }
            }
        }

        try {
            const res = await updateCartItemAPI({
                ...tempItem, 
                isPrimary: !!isGuest 
            })

            if(res && res.data.result)
            {
                temp.splice(index, 1, tempItem)
                dispatch(todoProduct({
                    cart: tempCart,
                    type: 'FETCH_CART'
                }))
                setIsHandling(false)
            }
        } catch (error) {
            
        }
    }

    const onClickDeleteCartItem = async () => {
        try {
            const res = await removeFromCart({
                id: chooseItem._id,
                isPrimary: !!isGuest 
            })

            if(res && res.data.result)
            {
                dispatch(todoProduct({
                    type: 'REMOVE_FROM_CART',
                    index: 0,
                    cartItem: chooseItem
                }))
                showNotification('Xóa sản phẩm thất bại', 'Xóa sản phẩm thành công', type.succsess, 3000)
            }
            else
            {
                showNotification('Xóa sản phẩm thất bại', res.data.msg, type.danger, 3000)
            }
            setShowConfirm(false)
        } catch (error) {
            showNotification('Xóa sản phẩm thất bại', error.message, type.danger, 3000)
            console.log(error)
        }
    }

    const onChangeCheckBoxOrderItem = (e, item) => {
        let temp = [...order.orderItemId]
        if(e.target.checked)
        {
            //add
            temp.push(item)
        }
        else
        {
            //remove
            temp = [...temp.filter(e => e._id !== item._id)]
        }
        setOrder({
            ...order,
            orderItemId: temp
        })
    }

    const handlePayment = async () => {
        try {
            const res = await payment({
                ...order,
                bankCode: 'NCB',
                orderDescription: `Thanh toan don hang Soup Store ${order.totalPrice} cua ${user.name}!!!`,
                orderType: 'topup',
                language: 'vn'
            })
            if(res)
            {
                window.open(res.data.data,'MyWindow','width=1200,height=600'); 
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePaymentCOD = async () => {
        try {
            const res = await paymentCOD({
                ...order
            })
            if(res)
            {
                history.replace(`/user/purchase/${order.type}/pending`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePaymentPaypal = async () => {
        try {
            const res = await paymentPaypal({
                ...order,
                bankCode: 'NCB',
                orderDescription: `Thanh toan don hang Soup Store ${order.totalPrice} cua ${user.name}!!!`,
                orderType: 'topup',
                language: 'vn'
            })
            if(res)
            {
                window.open(res.data,'MyWindow','width=1200,height=600');
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart-list-container">
            <ConfirmDialog 
            show={showConfirm} 
            setShow={setShowConfirm} 
            title="Bạn có chắc chắn muốn xóa sản phẩm này" 
            content="Việc xóa sản phẩm này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không ?"
            onSave={onClickDeleteCartItem}
            />

             <ul className="header-cart-table">
                <li style={{width: "50%"}}>
                    <div className="stardust-radio-justify"> 
                        <input 
                        ref={refChooseAll}
                        onChange={e => {
                            ref.current.map(element => {
                                element.checked = e.target.checked
                            })
                            if(e.target.checked)
                            {
                                setOrder({
                                    ...order,
                                    orderItemId: cart.cartItemId
                                })
                            }
                            else
                            {
                                setOrder({
                                    ...order,
                                    orderItemId: []
                                })
                            }
                        }}
                        type="checkbox" name="address" id="address1"></input>
                    </div>
                    Sản phẩm</li>
                <li style={{width: "15%"}}>Đơn giá</li>
                <li style={{width: "10%"}}>Số lượng</li>
                <li style={{width: "15%"}}>Tổng cộng</li>
                <li style={{width: "10%"}}>Thao tác</li>
             </ul>
             <ul className={isHandling ? "body-cart-table handling" : "body-cart-table"}>
                 {
                     cart.cartItemId.map((item, index) => (
                        <li key={item._id+'cartItem'} className="cart-item">
                            <div style={{display: 'flex', width: '50%'}}>
                                <div className="stardust-radio-justify"> 
                                    <input ref={e => ref.current[index] = e}
                                    onChange={e => onChangeCheckBoxOrderItem(e, item)}
                                    type="checkbox" 
                                    defaultChecked={false} name="address" id="address1"></input>
                                </div>
                                <div className="image-container">
                                    <img src={item.productId.image}></img>
                                </div>
                                <p>
                                    <span>{item.productId.name}</span>
                                    <br></br>
                                    {item.description}
                                </p>
                            </div>
                            <div style={{width: "15%"}}>
                                {/* <span className="price">₫23.990.000</span> */}
                                <span className="sale-off-price">{formatCurrency(item.price)}</span>
                            </div>
                            <div style={{width: "10%"}}>
                                <div className="toogle-amount-container">
                                    <span onClick={() => updateAmount(false, item)}>
                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                    </span>
                                    <span>
                                        <h4>{item.quantity}</h4>
                                    </span>
                                    <span onClick={() => updateAmount(true, item)}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div style={{width: "15%"}}>{formatCurrency(item.total)}</div>
                            <div style={{width: "10%"}}>
                                <a className='delete-cart-item' onClick={e => {
                                    e.preventDefault()
                                    setChooseItem(item)
                                    setShowConfirm(true)
                                }}>Xóa</a>
                            </div>
                        </li>
                     ))
                 }

             </ul>
             <div className="cart-action-handle">
                <div className="voucher-container">
                    <span>Mã khuyến mãi</span>
                    <div className="voucher-container-right">
                        <span>-20%</span>
                        <span>Chọn hoặc nhập mã</span>
                    </div>
                </div>
                <div className="payment-method-cart-price">
                    <span>Phương thức thanh toán</span>
                    {
                        !isChoosePaymentMethod && 
                        <div className="radio-choose-payment-method">
                            <Form>
                                <div key={`inline-radio`} className="mb-3">
                                    <Form.Check
                                        inline
                                        onChange={(e) => {
                                            e.target.checked && setOrder({
                                                ...order,
                                                typePayment: 'PAYPAL'
                                            })
                                        }}
                                        label="Thanh toán qua Paypal"
                                        name="group2"
                                        type="radio"
                                        id={`inline-radio-4`}
                                    />
                                    <Form.Check
                                        inline
                                        onChange={(e) => {
                                            e.target.checked && setOrder({
                                                ...order,
                                                typePayment: 'VNPAY'
                                            })
                                        }}
                                        label="Thanh toán qua VNPAY"
                                        name="group2"
                                        type="radio"
                                        id={`inline-radio-5`}
                                    />
                                    <Form.Check
                                        inline
                                        defaultChecked
                                        onChange={(e) => {
                                            e.target.checked && setOrder({
                                                ...order,
                                                typePayment: 'COD'
                                            })
                                        }}
                                        label="Thanh toán khi nhận hàng"
                                        name="group2"
                                        type="radio"
                                        id={`inline-radio-6`}
                                    />
                                </div>
                            </Form>
                        </div>
                    }
                    {
                        isChoosePaymentMethod &&
                        <div className="payment-method-cart-price-right">
                            <span>Thanh toán khi nhận hàng</span>
                            <span onClick={() => setIsChoosePaymentMethod(false)}>THAY ĐỔI</span>
                        </div>
                    }
                </div>
                <div className="choose-payment-method-container">

                </div>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <ul className="cart-button-container">
                        <li>
                            <span>Tổng tiền hàng</span>
                            <span>{formatCurrency(order.totalPrice)}</span>
                        </li>
                        {
                            order.type === 'online' && 
                            <li>
                                <span>Phí vận chuyển</span>
                                <span>{formatCurrency(order.deliveryFee)}</span>
                            </li>
                        }
                        {/* <li>
                            <span>Tổng cộng Voucher giảm giá:</span>
                            <span>₫20.960.000</span>
                        </li>
                        <li>
                            <span>Miễn Phí Vận Chuyển</span>
                            <span>₫{order.deliveryFee}</span>
                        </li> */}
                        <li>
                            <span>Tổng thanh toán</span>
                            <span>{formatCurrency(order.realPrice)}</span>
                        </li>
                    </ul>
                </div>
                <Button 
                disabled={order.orderItemId.length === 0 || isHandling}
                className="btn" onClick={() => {
                    setIsHandling(true)
                    switch (order.typePayment) {
                        case 'COD':
                            handlePaymentCOD()
                            break;
                        case 'VNPAY':
                            handlePayment()
                            break;
                        case 'PAYPAL':
                            handlePaymentPaypal()
                            break;
                        default:
                            break;
                    }
                }}>
                        Mua hàng
                </Button>
             </div>
        </div>
       
    )
}

export default CartTable
