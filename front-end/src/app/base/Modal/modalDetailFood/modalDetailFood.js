import React, { useState, useEffect, useContext } from 'react'
import { useIntl } from 'react-intl';
import { Modal, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addToCartAPI, updateCartItemAPI, removeFromCart, getCartByUserId } from '../../../core/apis/cart'
import { showNotification, type } from '../../../../utilities/Component/notification/Notification'
import { isEqual } from 'lodash-es';
import  Slider from 'react-slick'
import './modalDetailFood.scss'
import { todoProduct } from '../../../../store/cartReducer';
import { SocketContext } from '../../../context/socket';
import { updateTotalPrice } from '../../../../store/appReducer';
import { formatCurrency } from '../../../core/utils/format'

function ModalDetailFood(props) {
    const socket = useContext(SocketContext);
    const { formatMessage } = useIntl();
    const dispatch =  useDispatch();
    const [ isHandling, setIsHandling ] = useState(false)
    const { setIsShowModalDetailFood, productItem, isShowModalDetailFood, cartItemChoose } = props
    const user = useSelector(state => state.user.user)
    const roomId = useSelector(state => state.app.roomId)
    const isGuest =  new URLSearchParams(new URL(window.location.href).search).get('t')
    
    const roomData = !!isGuest ? JSON.parse(atob(isGuest.replace('#',''))) : null;

    const cart = useSelector(state => state.cart.cart)
    const [ currentItem, setCurrentItem ] = useState(cartItemChoose === undefined ? {
        productId: {...productItem},
        description: {...productItem}.size[0].type,
        note: '',
        price: {...productItem}.size[0].price,
        quantity: 1,
        sizeChoose: {...productItem}.size[0],
        toppingChoose: [],
        total: {...productItem}.size[0].price,
        userId: user._id    
    }
    : cartItemChoose)

    const updateAmount = (isIncrease) => 
    {
        if(isIncrease)
        {
            if(currentItem.quantity <= 19)
            {
                setCurrentItem({
                    ...currentItem,
                    quantity: currentItem.quantity + 1,
                    total: (currentItem.quantity + 1) * currentItem.price
                })
            }
        }
        else
        {
            if(currentItem.quantity > 1)
            {
                setCurrentItem({
                    ...currentItem,
                    quantity: currentItem.quantity - 1,
                    total: (currentItem.quantity - 1) * currentItem.price
                })
            }
        }
    }

    const onChangeUpdateNote = (e) => {
        setCurrentItem({
            ...currentItem,
            note: e.target.value
        })
    }

    const checkIsExist = (cart, cartItem) => {
        console.log(cart)
        const temporaryCartFilter = [...cart.cartItemId].filter(item => item.productId._id === cartItem.productId._id)
        let isExist = -1
        for (const item of temporaryCartFilter) {
            if(isEqual([...item.toppingChoose].sort(), [...cartItem.toppingChoose].sort()) && item.sizeChoose._id === cartItem.sizeChoose._id)
            {
                isExist = cart.cartItemId.findIndex(item1 => item1._id === item._id)
                break
            } 
        }
        return isExist
    }

    const handleUpdateCart = (cart, cartItem, isExist) => {
        const temp = {...cart.cartItemId[isExist]}
        if(temp.quantity + cartItem.quantity >=20)
        {
            cart.mount = cart.mount - temp.quantity + 20
            temp.quantity = 20
            cart.totalPrice = cart.totalPrice - temp.total + temp.price * 20
            temp.total = temp.price * 20
        }
        else
        {
            cart.mount = cart.mount + cartItem.quantity
            temp.quantity = temp.quantity + cartItem.quantity
            cart.totalPrice = cart.totalPrice + temp.price * cartItem.quantity
            temp.total = temp.price * temp.quantity
        }
        temp.note = cartItem.note
        const tempArr = [...cart.cartItemId]
        tempArr.splice(isExist,1, temp)
        cart = {
            ...cart,
            cartItemId: tempArr
        }
        return cart
    }

    const handleUpdateCartInPanelCart = (cart, cartItem, index) => {
        const temp = {...cart.cartItemId[index]}
        cart.totalPrice = cart.totalPrice - (temp.quantity * temp.price ) + (cartItem.price * cartItem.quantity)
        cart.mount = cart.mount - temp.quantity + cartItem.quantity
        temp.quantity = cartItem.quantity
        temp.total = cartItem.price * cartItem.quantity
        temp.note = cartItem.note
        const tempArr = [...cart.cartItemId]
        tempArr.splice(index,1, temp)
        cart = {
            ...cart,
            cartItemId: tempArr
        }
        return cart
    }

    const handleAddToCart = (cart, cartItem) => {
        let temp = [...cart.cartItemId]
        temp.push(cartItem)
        cart = {
            ...cart,
            cartItemId: temp,
            mount : cart.mount + cartItem.quantity,
            totalPrice: cart.totalPrice + cartItem.total
        }
        return cart
    }

    const addToCart = async() => 
    {
        setIsHandling(true)
        const isGuest =  new URLSearchParams(new URL(window.location.href).search).get('t')
        const roomData = !!isGuest ? JSON.parse(atob(isGuest.replace('#',''))) : null;

        try {
            let tempCart = {...cart}

            if (isGuest) {
                const ownerCart = await getCartByUserId({id: roomData?.ownerId, isPrimary: false});
                tempCart = {...ownerCart?.data?.cart?.data}
            }

            const isExist = checkIsExist(tempCart, currentItem)
            let res = null
            if(cartItemChoose === undefined)
            {
                if(isExist !== -1)
                {
                    //trung` => update
                    tempCart = handleUpdateCart(tempCart, {...currentItem}, isExist)
                    res = await updateCartItemAPI({
                        ...tempCart.cartItemId[isExist],
                        ownerId: roomData?.ownerId,
                        isPrimary: !isGuest
                    })
                }
                else
                {
                    //khong trung` => add
                    res = await addToCartAPI({
                        ...currentItem,
                        ownerId: roomData?.ownerId,
                        isPrimary: !isGuest
                    })
                }
            }
            else
            {
                if(isExist !== -1)
                {
                    let mainCart = {...cart}

                    if(isGuest) mainCart = tempCart;

                    if({...mainCart.cartItemId[isExist]}._id === currentItem._id)
                    {
                        //giong voi thang cu~
                        // update thang cu~
                        tempCart = handleUpdateCartInPanelCart(tempCart, {...currentItem}, isExist)
                    }
                    else
                    {
                        //giong voi 1 item khac khong phai thang cu~
                        // + quantitiy, total cho thang item do va xoa thang cu~ di
                        tempCart = handleUpdateCart(tempCart, {...currentItem}, isExist)
                        //xoa thang cu~ by currrentItem._id
                        res = await removeFromCart({
                            id: currentItem._id,
                            ownerId: roomData?.ownerId,
                            isPrimary: !isGuest
                        })
                    }
                    
                    res = await updateCartItemAPI({
                        ...tempCart.cartItemId[isExist],
                        ownerId: roomData?.ownerId,
                        isPrimary: !isGuest
                    })
                }
                else
                {
                    //khong giong voi item nao trong cart
                    //add moi
                    res = await addToCartAPI({
                        ...currentItem,
                        _id: undefined,
                        ownerId: roomData?.ownerId,
                        isPrimary: !isGuest
                    })
                }
                
            }

            if (res && res.data.result && isGuest) {
                socket.emit('refreshOrder', {name: user.name, userId: roomData?.ownerId, room: isGuest, type: 'add'})
            } else if (res && res.data.result && !isGuest) {
                //update store
                console.log('exist', isExist)
                if(isExist !== -1)
                {
                    dispatch(todoProduct({
                        cart: tempCart,
                        type: 'FETCH_CART'
                    }))
                    dispatch(updateTotalPrice(tempCart?.totalPrice))

                    if({...cart.cartItemId[isExist]}._id !== currentItem._id && cartItemChoose !== undefined)
                    {
                        dispatch(todoProduct({
                            type: 'REMOVE_FROM_CART',
                            index: 0,
                            cartItem: currentItem
                        }))
                    }
                }
                else
                {
                    dispatch(todoProduct({
                        cart: handleAddToCart(tempCart, {
                            ...res.data.data,
                            sizeChoose: currentItem.sizeChoose
                        }),
                        type: 'FETCH_CART'
                    }))
                    dispatch(updateTotalPrice(handleAddToCart(tempCart, {
                        ...res.data.data,
                        sizeChoose: currentItem.sizeChoose
                    })?.totalPrice))
                }

                showNotification('Thông báo', `${user.name} đã thêm sản phẩm mới`, type.succsess, 3000)
            }
            else
            {
                showNotification('Thêm vào giỏ hàng thất bại', res.data.msg, type.danger, 3000)
            }

            setIsShowModalDetailFood(false)
        } catch (error) {
            console.log(error)
            setIsShowModalDetailFood(false)
        }
    }
    
    const chooseSize = (size) => {
        setCurrentItem({
            ...currentItem,
            sizeChoose: size,
            description: currentItem.description.replace(currentItem.sizeChoose.type, size.type)
        })
    }

    const chooseOption = (option, e) => {
        let temp = [...currentItem.toppingChoose]
        if(e.target.checked)
        {
            //check
            temp.push(option)
            setCurrentItem({
                ...currentItem,
                toppingChoose: temp,
                description: currentItem.description.concat(` - ${option.type}`)
            })
        }
        else
        {
            //uncheck
            temp.splice(temp.findIndex(item => item._id === item._id), 1)
            setCurrentItem({
                ...currentItem,
                toppingChoose: temp,
                description: currentItem.description.replace(` - ${option.type}`, '')
            })
        }
    }

    useEffect(() => {
        //update price of cartItem
        let temp = [...currentItem.toppingChoose]
    
        let sum = temp.reduce((prev, cur, curIn, arr) => {
            return(
                prev + cur.price
            )
        }, currentItem.sizeChoose.price)
        
        setCurrentItem({
            ...currentItem,
            price: sum
        })

    }, [currentItem.sizeChoose, currentItem.toppingChoose])

    useEffect(() => {
       
        setCurrentItem({
            ...currentItem,
            total: currentItem.price * currentItem.quantity
        })
    }, [currentItem.price])

    const settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <Modal
            show={isShowModalDetailFood}
            size="lg"
            onHide={() => setIsShowModalDetailFood(false)}
            id = "modal-detail-food"
            >
            <div className="modal-header">
                <div className="bg-image">
                    <img src={currentItem?.productId?.name} alt=""></img>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsShowModalDetailFood(false)}>
                    <i className="ti ti-close"></i></button>
            </div>
            <div className="modal-body">
                <Row>
                    <Col md={6} lg={6} className="picture-price-product">
                        <div className="picture-price-product-container">
                            <div className="product">
                                <img src={currentItem?.productId?.image} alt=""></img>
                            </div>
                            <div className="price-total">
                                <h3>{formatCurrency(currentItem?.total)}</h3>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={6} className="detail-info">
                        <form className="detail-info-container">
                            <div className="title">
                                <h5>{currentItem?.productId?.name}</h5>
                                <div className="info-product-container">
                                    <i className="fa fa-info" aria-hidden="true"></i>
                                    <div className="content-description">
                                        <span>{currentItem?.productId?.description}</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="dough-size-preview">
                                <h6>{currentItem?.productId?.description}</h6>
                            </div>
                            <div className="toping-overview-container">
                                <div className="toping-overview">
                                    <span>{currentItem?.description}</span>
                                </div>
                            </div>
                            <div className="attribute">
                                <div className="size border-bottom">
                                    <h6>KÍCH THƯỚC</h6>
                                    <ul className="size-list">
                                        {
                                            currentItem?.productId?.size.map((item, index) => (
                                                <li className="col-3 size-option-item" key={"size-"+index}>
                                                    <input defaultChecked={item._id === currentItem?.sizeChoose._id ? true : false} className="radio" type="radio" id={"size-"+index} name="size"></input>
                                                    <label htmlFor={"size-"+index} onClick={() => chooseSize(item)}>
                                                        <h6>
                                                            {item.type}
                                                        </h6>
                                                        <h6>
                                                            {formatCurrency(item.price)}
                                                        </h6>
                                                        {/* {item.name +" "+ item.sell_price + " đ"} */}
                                                    </label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                
                                <div className="toping">
                                    <h6>THÊM NHÂN</h6>
                                    <ul className="toping-list">
                                        <Slider 
                                            className="toping-list-slider"
                                            {...settings}>
                                                {
                                                currentItem?.productId?.topping.map((item, index) => (
                                                    <li className="toping-option-item" key={"topping-"+index}>
                                                        <input 
                                                        defaultChecked={currentItem.toppingChoose.some(element => element._id === item._id)}
                                                        className="checkbox" type="checkbox" id={"topping-"+index} name="toping"
                                                        onChange={(e) => chooseOption(item, e)}></input>
                                                        <label htmlFor={"topping-"+index}>
                                                            <div className="image-container">
                                                                <img src={item.image} alt=""></img>
                                                            </div>
                                                            {/* {item.name +" "+ item.sell_price + " đ"} */}
                                                            <h6>
                                                                {item.type}
                                                            </h6>
                                                            <h6>
                                                                {formatCurrency(item.price)}
                                                            </h6>
                                                            </label>
                                                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                    </li>
                                                ))
                                            }
                                        </Slider>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div className="amount">
                                    <h6>SỐ LƯỢNG</h6>
                                    <div className="toogle-amount-container">
                                        <span onClick={() => updateAmount(false)}>
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                        </span>
                                        <span>
                                            <h4>{currentItem?.quantity }</h4>
                                        </span>
                                        <span onClick={() => updateAmount(true)}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            <div className="note">
                                <h6>GHI CHÚ</h6>
                                <textarea 
                                defaultValue={currentItem?.note}
                                onChange={e => onChangeUpdateNote(e)}
                                type="text" rows="2" placeholder="Nhập ghi chú của bạn tại đây"></textarea>
                            </div>
                            <div className="add-to-cart">
                                <button type="button" className="btn" 
                                disabled={isHandling}
                                onClick={addToCart}>Add to cart</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Modal>   
    );
}

export default ModalDetailFood;
