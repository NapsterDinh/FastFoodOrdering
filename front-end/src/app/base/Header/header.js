import React, { useState, useEffect, useContext } from 'react'
import { Container , Row, Col, Dropdown, Image } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { updateTotalPrice } from '../../../store/appReducer';
import { SocketContext } from '../../context/socket';

import messages from '../../core/msg/header.js';
import Navbar  from '../Navbar/navbar';
import PanelCart from '../Panel/Panel_Cart/panel_cart';
import SearchBranch from '../SearchBranch/searchBranch';
import ProfileDropDown from '../Dropdown/Profile/profile';
import LangDropDown from '../Dropdown/Language/language';
import Notification from '../Dropdown/Notification/notification';
import {Link} from "react-router-dom";
import { isEmpty } from 'lodash';
import { formatCurrency } from '../../core/utils/format';
import { todoProduct } from '../../../store/cartReducer';

import './header.scss'
import { getCartByUserId } from '../../core/apis/cart';

function Header() {
    const { formatMessage } = useIntl();
    const dispatch =  useDispatch();
    const history = useHistory();
    const socket = useContext(SocketContext);
    
    const user = useSelector((state) => state.user.user);
    const reducerToken = useSelector(state => state.getToken.token)
    const roomId = useSelector((state) => state.app.roomId);
    const totalPrice = useSelector((state) => state.app.totalPrice)
    
    const [ showPanelCart, setShowPanelCart ] = useState(false)
    const [ isRefresh, setIsRefresh ] = useState(new Date().getTime()) 
   
    useEffect(() => {
        (async () => {
            if (!user) {
                return;
            }

            //First login as guest
            const roomUrlId = new URLSearchParams(new URL(window.location.href).search).get('t')
            const roomData = !!roomUrlId && JSON.parse(atob(roomUrlId.replace('#','')));
            if ((!roomId && roomUrlId) || !!roomId) {
                socket.emit('joinOrder',{id: user.id, name: user?.name, room: roomUrlId ?? roomId})
                
                socket.emit('refreshOrder', {name: user.name, userId: roomData?.ownerId, room: roomUrlId ?? roomId, type: 'none'})
            } else {
                //No roomId in redux
                const ownerCart = await getCartByUserId({id: user.id, isPrimary: true});
                dispatch(updateTotalPrice(ownerCart?.data?.cart?.data?.totalPrice));
                dispatch(todoProduct({
                    cart: {...ownerCart?.data?.cart?.data},
                    type: 'FETCH_CART'
                }))
            }
        })()
    }, [roomId])

    const goToPage = (url) => {
        history.replace(url)
    }

    return (
        <div className="header-container">
            <header id="header" className="light">
                <Container className="header-container-inner">
                    <Row>
                        <Col md="3">
                            <div className="module module-logo dark">
                                <Link onClick={() => goToPage('/')}>
                                    <img src="/logo-light.svg" alt="" width="88"></img>
                                </Link>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="top-header">
                                <div className="middle-header-container">
                                    <div className="module-lang">
                                        <SearchBranch/>
                                        <LangDropDown/>          
                                    </div>
                                    <div className="module-login-profile">
                                    {
                                        isEmpty(reducerToken) && 
                                        <div className="login-container">
                                            <div className="login-container-inner">
                                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                <a href="/login?returnUrl=%2F" className="register">Đăng nhập</a>
                                                    <span>/</span>
                                                <a href="/register?returnUrl=%2F" className="login">Tạo tài khoản</a>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !isEmpty(reducerToken) && 
                                        <>
                                            <Notification loginedUser={user} />
                                            <ProfileDropDown loginedUser={user}/>
                                        </>
                                    }                             
                                </div>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <Navbar/>
                                <div className="cart-container">
                                    <a className="module-cart right" data-toggle="panel-cart" onClick={(e) => {
                                        setIsRefresh(new Date().getTime());
                                        setShowPanelCart(true)
                                    }}>
                                        <span className="cart-icon">
                                            <i className="ti ti-shopping-cart"></i>
                                            {/* <span className="cart-count">0</span> */}
                                            <span className="notification">0</span>
                                        </span>
                                        <span className="cart-value"><span className="value">{formatCurrency(totalPrice)}</span></span>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
            <header id="header-mobile" className="light">
                
                <div className="module module-nav-toggle">
                    <a href="#" id="nav-toggle" data-toggle="panel-mobile"><span></span><span></span><span></span><span></span></a>
                </div>

                <div className="module module-logo">
                    <a href="index.html">
                        <img src="/logo-horizontal-dark.svg" alt=""></img>
                    </a>
                </div>

                <a href="#" className="module module-cart" data-toggle="panel-cart" onClick={(e) => setShowPanelCart(true)}>
                    <i className="ti ti-shopping-cart"></i>
                    <span className="notification">0</span>
                </a>

            </header>
            <PanelCart show={showPanelCart} setShow={setShowPanelCart} isRefresh={isRefresh}/>
            <div id="body-overlay"></div>
        </div>
    )
}

export default Header