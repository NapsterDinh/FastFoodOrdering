import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { todoProduct } from '../../../../store/cartReducer'
import ModalDetailFood from '../../Modal/modalDetailFood/modalDetailFood'
import LoadingOverlay from 'react-loading-overlay';
import { showNotification, type as TYPE } from '../../../../utilities/Component/notification/Notification';
import { checkoutAvailable, doneOrder, getCartByUserId, joinOrder, removeFromCart } from '../../../core/apis/cart';

import './panel_cart.scss'
import { SocketContext } from '../../../context/socket';
import { updateTotalPrice } from '../../../../store/appReducer';
import { formatCurrency } from '../../../core/utils/format';
import { useHistory } from 'react-router-dom'

function PanelCart(props) {
    const cartData = useSelector((state) => state.cart.cart)
    const user = useSelector(state => state.user.user)
    const ownerRoomId = useSelector(state => state.app.roomId)

    const socket = useContext(SocketContext)
    const history = useHistory();
    const dispatch =  useDispatch();
    const { show, setShow } = props
    const { formatMessage } = useIntl();
    const [ isShowModalDetailFood, setIsShowModalDetailFood ] = useState(false)
    const [ productItem, setProductItem ] = useState(null)
    const [ cart, setCart ] = useState(cartData)
    const [ cartName, setCartName ] = useState('Your Cart')
    const [ isActive, setIsActive ] = useState(false)
    const [ isDone, setIsDone ] = useState(true)

    const getRoom = () => { 
        const roomId = new URLSearchParams(new URL(window.location.href).search).get('t')
        const roomData = !!roomId && JSON.parse(atob(roomId.replace('#','')));

        return {
            roomId,
            roomData,
        }
    }

    useEffect(() => {   
        if (!!getRoom().roomId) {
            socket.emit('refreshOrder', {name: user.name, userId: getRoom().roomData?.ownerId, room: getRoom().roomId ?? ownerRoomId, type: 'none'})
        } else {
            (async () => {
                await refreshOrder(user.name, user.id, 'none', true)
            })()  
        }
    },[props?.isRefresh])

    useEffect(() => {
        socket.on('refreshOrder',({name, room, userId, type}) => {
            (async () => {
                await refreshOrder(name, userId, type, false)
            })() 
        })
        
        socket.on('orderGroup', ({id, name, room}) => {
            (async () => {
                console.log('[Socket] new user join', name)
                
                if (id === user.id) {
                    await joinOrder({roomId: getRoom().roomId})
                }
            })()
        })
        
        console.log('[Socket] emit register')
        return function cleanup() {
            socket.off('refreshOrder')
            socket.off('orderGroup')
        }
    }, [])

    const refreshOrder = async (name, userId, type, isPrimary) => {
        console.log('[Socket] initializing..',getRoom().roomId,new URL(window.location.href), )
        setIsActive(true)

        const ownerCart = await getCartByUserId({id: userId, isPrimary});
        setCart({...ownerCart?.data?.cart?.data});
        dispatch(updateTotalPrice(ownerCart?.data?.cart?.data?.totalPrice));
        dispatch(todoProduct({
            cart: {...ownerCart?.data?.cart?.data},
            type: 'FETCH_CART'
        }))

        switch(type) {
            case 'add':
                showNotification('Thông báo', `${name} đã thêm sản phẩm mới`, TYPE.succsess, 3000);
                break;
            case 'delete':
                showNotification('Thông báo', `${name} vừa xoá sản phẩm`, TYPE.warning, 3000);
                break;                         
        }

        if (!!getRoom().roomId) {
            setCartName(`${ownerCart.data?.cart?.data?.userId?.name}'s Cart`)
        } else {
            setCartName(`Your Cart`) 
        }

        setIsActive(false)
    }

    const onClickDeleteCartItem = async (index, item) => {
        try {
            console.log(item)
            const res = await removeFromCart({
                id: item._id,
                ownerId: getRoom().roomData?.ownerId,
                isPrimary: !getRoom().roomId
            })

            if(res && res.data.result)
            {
                dispatch(todoProduct({
                    type: 'REMOVE_FROM_CART',
                    index: index,
                    cartItem: item
                }))

                if (!!getRoom().roomId) {
                    socket.emit('refreshOrder', {name: user.name, userId: getRoom().roomData?.ownerId, room: getRoom().roomId ?? ownerRoomId, type: 'delete'})
                } else {
                    (async () => {
                        await refreshOrder(user.name, user.id, 'delete', true)
                    })()  
                }
            }
            else
            {
                showNotification('Xóa sản phẩm thất bại', res.data.msg, TYPE.danger, 3000)
            }
        } catch (error) {
            showNotification('Xóa sản phẩm thất bại', error.message, TYPE.danger, 3000)
            console.log(error)
        }
    }

    const openModalDetailFood = (item) => {
        setProductItem(item)
        setIsShowModalDetailFood(true)
    }

    const imDone = async () => {
        await doneOrder({roomId: getRoom().roomId})

        setIsDone(false)
    }

    const isNextAvailable = async () => {
        if (!getRoom().roomId) {
            console.log(cartData)
            history.replace(`/cart`)
            return;
        }

        const res = await checkoutAvailable({roomId: getRoom().roomId})
        if (!res.data?.cart) {
            showNotification('Thông báo', 'Người dùng chưa hoàn tất chọn sản phẩm', TYPE.danger, 3000)
            return;
        }

        history.replace(`/cart?t=${getRoom().roomId}`)
    }

    const isOwnerShare = () => {
        return getRoom().roomData?.ownerId === user.id
    }

    return (
        <>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            id="panel-cart"
            >
            <div className="panel-cart-container">
                <div className="panel-cart-title">
                    <h5 className="title">{cartName}</h5>
                    <button onClick={() => setShow(false)} className="close" data-toggle="panel-cart"><i className="ti ti-close"></i></button>
                </div>
                
                <div className="panel-cart-content cart-details">
                    <div className="cart-table">
                        {
                            cart?.cartItemId?.map((item, index) => (
                                <div className='content-cart-table' key={index}>
                                    <div className="cart-item-container"> 
                                        <div className="cover-container">
                                            <img src={item.productId.image} alt="" onClick={() => openModalDetailFood(item)}></img>
                                        </div>
                                        <div className="info-container">
                                            <h6 className="" onClick={() => openModalDetailFood(item)}>{item.productId.name}</h6>
                                            <span className="text-muted food-item-description text-sm">{item.description}</span>
                                            <h6 className="text-muted food-item-description text-sm">Amount: {item.quantity}</h6>
                                        </div>
                                        <div className="total-container">
                                        <h4 className="mb-0" >{formatCurrency(item.total)}</h4>
                                        </div>
                                        <span className="delete-item" onClick={() => onClickDeleteCartItem(index, item)}>
                                            <i className="ti ti-close"></i>
                                        </span>
                                    </div>
                                    <hr className="hr-sm"></hr>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="cart-summary" style={cart.numberCart===0 ? {display: 'none'} : {display:'block'}}>
                        <div className="row">
                            <div className="col-7 text-right text-muted">Order total:</div>
                            <div className="col-5"><strong>$<span className="cart-products-total">0.00</span></strong></div>
                        </div>
                        <div className="row">
                            <div className="col-7 text-right text-muted">Devliery:</div>
                            <div className="col-5"><strong>$<span className="cart-delivery">3.99</span></strong></div>
                        </div>
                        <hr className="hr-sm"></hr>
                        <div className="row text-lg">
                            <div className="col-7 text-right text-muted">Total:</div>
                            <div className="col-5"><strong>$<span className="cart-total">3.99</span></strong></div>
                        </div>
                    </div> */}
                    <div className="cart-empty" style={cart?.cartItemId?.length !==0 ? {display: 'none'} : {display:'block'}}>
                        <i className="ti ti-shopping-cart"></i>
                        <p>Your cart is empty...</p>
                    </div>
                </div>

                <LoadingOverlay
                    active={isActive}
                    spinner
                    text='Loading product...'
                    >
                </LoadingOverlay>
            </div>
            {(isOwnerShare() || (!isOwnerShare() && !getRoom().roomId)) && (<a onClick={isNextAvailable} className="panel-cart-action btn btn-secondary btn-block btn-lg"><span>Xem danh sách giỏ hàng</span></a>)}
            {(!isOwnerShare() && isDone && getRoom().roomId) && (<a onClick={imDone} className="panel-cart-action btn btn-secondary btn-block btn-lg"><span>Tôi đã xong</span></a>)}
        </Modal>   
        {
            isShowModalDetailFood && 
            <ModalDetailFood 
            cartItemChoose={productItem}
            isShowModalDetailFood={isShowModalDetailFood}
            setIsShowModalDetailFood={setIsShowModalDetailFood}/>
        }
        </>
        
    )
}

export default PanelCart