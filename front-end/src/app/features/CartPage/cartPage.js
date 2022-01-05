import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useIntl } from 'react-intl';
import { Form } from 'react-bootstrap'
import './cartPage.scss'
import LoadingOverlay from 'react-loading-overlay';
import Address from '../../base/Table/Address/address';
import CartTable from '../../base/Table/CartTable/cartTable';
import Header from '../../base/Header/header';
import SectionTitle from '../../base/section/section_title/section_Title';
import Footer from '../../base/Footer/footer'
import ModalSelectBranch from '../../base/Modal/ModalSelectBranch/ModalSelectBranch'

import { getAllBranch } from '../../core/apis/branch'
import { getAllAddressUser, getDistance } from '../../core/apis/user'
import { useSelector } from 'react-redux';

let defaultSectionTitle = {
    title: 'Menu List', 
    content: 'Some informations about our restaurant',
    image: '/bg-croissant.jpg'
}


function CartPage(props) {
    
    const [ isActive, setIsActive ] = useState(false)
    const user = useSelector(state => state.user.user)
    const cart = useSelector(state => state.cart.cart)

    const [ showBranch, setShowBranch ] = useState(false)
    const [ branches, setBranches ] = useState([])
    const [ addressList , setAddressList ] = useState('')

    const [ order, setOrder ] = useState(
        {
            userId: user.id,
            branchId: '',
            orderItemId: [],
            couponId: '',
            status: 'pending',
            note: '',
            cartOverview: '',
            rating: '',
            totalPrice: 0,
            deliveryFee: 0,
            realPrice: 0,
            idUserDetail: '',
            latitude: -1,
            longitude: -1,
            type: 'online',
            isPaid: false,
            typePayment: 'COD',
            amount: 0,
            feedbackId: ''
        }
    )

    const fectchBranches = async () => {
        try {
            const res1 = await getAllAddressUser()
            const res2 = await getAllBranch()
            if(res1 && res2)
            {
                setBranches(res2.data.data)
                setAddressList(res1.data.data)
                const temp = res1.data.data.filter(item => item.isDefault)
                setOrder({
                    ...order,
                    idUserDetail: temp,
                    latitude: temp[0].latitude,
                    longitude: temp[0].longitude,
                    branchId: res2.data.data[0]
                })
            }
            else
            {

            }
        } catch (error) {
            
        }
    }
    useEffect(async () => {
        await fectchBranches()
    }, [])

    // useEffect(() => {
    //     setOrder({
    //         ...order,
    //         orderItemId: [...cart.cartItemId],
    //         totalPrice: cart.totalPrice,
    //         amount: 0
    //     })
    // }, [cart.cartItemId])

    useEffect(() => {
        setOrder({
            ...order,
            amount: order.orderItemId.reduce(((prev,cur,curIn,arr) => prev + cur.quantity), 0),
            totalPrice: order.orderItemId.reduce(((prev,cur,curIn,arr) => prev + cur.total), 0),
        })
    }, [order.orderItemId])

    useEffect(() => {
        setOrder({
            ...order,
            realPrice: parseInt(parseInt(order.totalPrice) + parseInt(order.deliveryFee) - parseInt((order.couponId === '' ? 0 : (order.couponId.discount * order.totalPrice))))
        })
        console.log(order)
    }, [order.totalPrice, order.deliveryFee, order.couponId])


    const addressComponent = () => {
        if(addressList !== '')
        {
            if(order.type === 'online')
            {
                return(
                    <Address addressList={addressList} setAddressList={setAddressList} setOrder={setOrder} order={order}/>
                )
            }
        }
    }
    const calculateDeliveryFee = async () => {
        if(order.type === 'online')
        {
            try {
                const res = await getDistance({
                    lat1: order.branchId.latitude,
                    lng1: order.branchId.longitude,
                    lat2: order.latitude,
                    lng2: order.longitude
                })
                if(res.data.code === 'Ok')
                {
                    setOrder({
                        ...order,
                        deliveryFee: parseInt((res.data.routes[0].distance) * 3)
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }   
        else    
        {
            setOrder({
                ...order,
                deliveryFee: 0
            })
        }
    }

    useEffect(() => {
        calculateDeliveryFee()
    }, [order.branchId, order.longitude, order.type, order.idUserDetail])

    return (
        <div id="body-wrapper" className="animsition">
        <Header/>
        <div id="content">
          <SectionTitle objectSectionTilteContent={{...defaultSectionTitle, title: 'Giỏ hàng' }}/>
          <div className="middle-content">
            <LoadingOverlay
                active={isActive}
                spinner
                text='Wait a second...'
                >
            </LoadingOverlay>
            {
                showBranch &&
                <ModalSelectBranch 
                branches={branches} 
                showBranch={showBranch} 
                setShowBranch={setShowBranch} 
                order={order}
                setOrder={setOrder}/>
            }
            <div className="page-content">
                <div className="container">
                    <div className="row no-gutters">
                    <div className="order-method-cart">
                        <span>Phương thức đặt hàng</span>
                        <div className="order-method-cart-right">
                            <Form>
                                <div key={`inline-radio`} className="mb-3">
                                    <Form.Check
                                        inline
                                        defaultChecked
                                        onChange={(e) => {
                                            !e.target.checked ? setOrder({
                                                ...order,
                                                type: 'takeaway'
                                            }) : setOrder({
                                                ...order,
                                                type: 'online'
                                            })
                                        }}
                                        label="Đơn hàng giao tận nơi"
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-1`}
                                    />
                                    <Form.Check
                                        inline
                                        onChange={(e) => {
                                            e.target.checked ? setOrder({
                                                ...order,
                                                type: 'takeaway'
                                            }) : setOrder({
                                                ...order,
                                                type: 'online'
                                            })
                                        }}
                                        label="Đơn hàng take-away"
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-2`}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="order-method-cart">
                        <span>Chọn chi nhánh đặt hàng</span>
                        <div className="order-method-cart-right">
                            <span>{order.branchId.name}</span>
                            <span onClick={() => setShowBranch(true)}>THAY ĐỔI</span>
                        </div>
                    </div>
                    {
                        addressComponent()
                    }
                        <CartTable order={order} setOrder={setOrder}/>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
    );
}

export default CartPage;
