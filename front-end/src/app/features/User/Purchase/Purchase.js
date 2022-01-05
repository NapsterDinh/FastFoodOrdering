import React, { useEffect } from "react";
import { useLocation, useParams, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav, Form, Col, Row, Button } from "react-bootstrap";
import OnlineOrder from './OrderOnline/OnlineOrder'
import TakeAwayOrder from './TakeAwayOrder/TakeAwayOrder'

import './Purchase.scss'

const Purchase = ({isActive,setIsActive}) => {
    let { type} = useParams()
    return(
        <>
        <Nav justify variant="tabs">
                <Nav.Item>
                    <NavLink exact className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active" to={`/user/purchase/${type}/`}>Tất cả</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink 
                    to={`/user/purchase/${type}/pending`} className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active">Chờ xác nhận</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink 
                    className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active"
                    to={`/user/purchase/${type}/process`}>Chờ thực hiện</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink 
                    className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active"
                    to={`/user/purchase/${type}/delivering`}>Đang giao</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink 
                    className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active"
                     to={`/user/purchase/${type}/done`}>Đã giao</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink 
                    className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active"
                     to={`/user/purchase/${type}/canceled`}>Đã hủy</NavLink>
                </Nav.Item>
            </Nav>
        <Switch>
            <Route path={[`/user/purchase/:type/:type1`, `/user/purchase/:type`]} render={() => {
                console.log('adadad', type)
            switch (type) {
                case "online":
                    return(
                        <OnlineOrder isActive={isActive} isOnlineOrder={true} setIsActive={setIsActive}/>
                    )
                case "takeaway":
                    return(
                        <OnlineOrder isActive={isActive} isOnlineOrder={false} setIsActive={setIsActive}/>
                    )
                default:
                    break;
            }}} />
        </Switch>
        </>
    )
}

export default Purchase