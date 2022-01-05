import React, {useEffect, useState} from "react";
import { Accordion, Row, Col, Card, Container } from "react-bootstrap";
import { Route, Switch, NavLink, useLocation, useParams } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import SectionTitle from '../../base/section/section_title/section_Title'
import Header from '../../base/Header/header'
import Footer from '../../base/Footer/footer';
import Account from "./Account/Account";
import Purchase from "./Purchase/Purchase";
import DetailOrder from './DetailOrder/DetailOrder'

import './UserPage.scss'

const UserPage = () => {
    const [ isActive, setIsActive ] = useState(true)
    const location = useLocation()
    let { type2 } = useParams()
    const [ activeKey, setActiveKey ] = useState(0)


    useEffect(() => {
        if(type2 === 'account')
        {
            setActiveKey(0)
        }
        else if(type2 === 'purchase')
        {
            setActiveKey(1)
        }
        else
        {
            setActiveKey(2)
        }
    }, [type2])

    const onClickHeaderAccordion = (e) => {
        e.target.classList.contains('show') ? e.target.classList.remove('show') : e.target.classList.add('show')
    }

    return(
        <div id="body-wrapper" className="animsition">
            <Header/>
            <div id="content">
            <SectionTitle objectSectionTilteContent={
                {
                    title: 'User Service', 
                    content: 'Some informations about our restaurant',
                    image: '/bg-croissant.jpg'
                }
            }/>
            <div className="middle-content">
                <Container fluid={"lg"} className="middle-user-page">
                    <Row>
                        <Col md={"3"}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header onClick={onClickHeaderAccordion}>Tài khoản của tôi</Accordion.Header>
                                    <Accordion.Body>
                                        <NavLink  to="/user/account/profile" exact className="link-container" activeClassName='selected'>
                                            <span>Hồ sơ</span>
                                        </NavLink>

                                        <NavLink  to="/" exact className="link-container" activeClassName='selected'>
                                            <span>Ngân hàng</span>
                                        </NavLink>

                                        <NavLink  to="/user/account/address" exact className="link-container" activeClassName='selected'>
                                            <span>Địa chỉ</span>
                                        </NavLink>

                                        <NavLink to="/"  exact className="link-container" activeClassName='selected'>
                                            <span>Đổi mật khẩu</span>
                                        </NavLink>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header onClick={onClickHeaderAccordion}>Đơn mua</Accordion.Header>
                                    <Accordion.Body>
                                        <NavLink to="/" exact className="link-container" activeClassName='selected'>
                                            <span>Tất cả</span>
                                        </NavLink>

                                        <NavLink to="/user/purchase/online" exact className="link-container" activeClassName='selected'>
                                            <span>Đơn hàng đặt online</span>
                                        </NavLink>

                                        <NavLink to="/user/purchase/takeaway" exact className="link-container" activeClassName='selected'>
                                            <span>Đơn hàng take-away</span>
                                        </NavLink>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header onClick={onClickHeaderAccordion}>Thông báo</Accordion.Header>
                                    <Accordion.Body>
                                        <NavLink to="/" exact className="link-container" activeClassName='selected'>
                                            <span>Cập nhật đơn hàng</span>
                                        </NavLink>

                                        <NavLink to="/" exact className="link-container" activeClassName='selected'>
                                            <span>Khuyến mãi</span>
                                        </NavLink>

                                        <NavLink to="/" exact className="link-container" activeClassName='selected'>
                                            <span>Cập nhật đánh giá</span>
                                        </NavLink>

                                        <NavLink to="/"  exact className="link-container" activeClassName='selected'>
                                            <span>Cập nhật ứng dụng</span>
                                        </NavLink>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col md={"9"}>
                            <LoadingOverlay
                                active={isActive}
                                spinner
                                >
                            </LoadingOverlay>
                            <Switch>
                                <Route exact path={['/user/account', '/user/account/:type']}>
                                    <Account setIsActive={setIsActive}/>
                                </Route>
                                <Route exact path={['/user/notification', '/user/notification/:type']}>
                                    <Account setIsActive={setIsActive}/>
                                </Route>
                                <Route exact path={['/user/purchase/id/:idOrder', '/user/purchase/:type/id/:idOrder']}>
                                    <DetailOrder isActive={isActive} setIsActive={setIsActive}/>
                                </Route>
                                <Route exact path={['/user/purchase', '/user/purchase/:type', '/user/purchase/:type/:type1']}>
                                    <Purchase isActive={isActive} setIsActive={setIsActive}/>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default UserPage