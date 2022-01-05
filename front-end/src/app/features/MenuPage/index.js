import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';

import { login } from '../../core/apis/api';
import messages from '../../core/msg/home';

import {updateLanguage} from '../../../store/appReducer';

import './menu.scss'
import Header from '../../base/Header/header'
import Footer from '../../base/Footer/footer';
import SectionTitle from '../../base/section/section_title/section_Title';
import MenuContent from '../../base/MenuContent/menuContent';
import CartPage from '../CartPage/cartPage';
import { Route, Switch } from 'react-router';
import LoadingOverlay from 'react-loading-overlay';

let defaultSectionTitle = {
  title: 'Menu List', 
  content: 'Some informations about our restaurant',
  image: '/bg-croissant.jpg'
}
export const MenuPage = (props) => {
  const lang = useSelector((state) => state.app.lang);
  const [ isActive, setIsActive ] = useState(false)
  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const { match, type } = props
  return (
    <div id="body-wrapper" className="animsition">
        <Header/>
        <div id="content">
          <SectionTitle objectSectionTilteContent={{...defaultSectionTitle, title: type }}/>
          <div className="middle-content">
            <LoadingOverlay
                active={isActive}
                spinner
                text='Wait a second...'
                >
            </LoadingOverlay>
            <Switch>
              <Route path={["/categories", "/categories/share/:shareCode"]} render={() =>  <MenuContent match={match}/>}/>
              <Route path="/categories/:categoryId" render={() =>  <MenuContent match={match}/>}/>
              <Route path="/checkout" render={() =>  <MenuContent match={match}/>}/>
              <Route path="/cart" render={() =>  <CartPage match={match}/>}/>
            </Switch>
          </div>
            
        </div>
        <Footer/>
    </div>
    
  );
}

export default MenuPage;
