import React, { useEffect } from "react";
import { useLocation, useParams, Switch, Route } from "react-router-dom";
import Profile from '../Account/Profile/Profile'
import Address from "./Address/Address";

import './Account.scss'

const routesArray = [
    {
        route: 'profile',
        component: Profile
    },
    {
        route: 'address',
        component: Profile
    },
    {
        route: 'payment',
        component: Profile
    },
    {
        route: 'changePass',
        component: Profile
    }
]
const Account = ({setIsActive}) => {
    let { type } = useParams()

    return(
        <Switch>
            <Route path="/user/account/profile" render={() => (<Profile setIsActive={setIsActive}/>)} />
            <Route path="/user/account/address" render={() => (<Address setIsActive={setIsActive}/>)}/>
            <Route path="/user/account/payment" component={Profile} />
            <Route path="/user/account/changePass" component={Profile} />
        </Switch>
    )
}

export default Account