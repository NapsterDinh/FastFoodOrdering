//React
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

//Components
import Header from '../../base/Header/header'
import Carousel from '../../base/Carousel/carousel'
import Footer from '../../base/Footer/footer';
import SectionAbout from '../../base/section/section_about/section_about';
import SectionMenu from '../../base/section/section_menu/section_menu';
import SectionStep from '../../base/section/section_step/section_step'
import SectionOffers from '../../base/section/section_offers/section_offers';
import SectionVideo from '../../base/section/section_video/section_video';
import CookieBar from '../../base/CookieBar/cookiebar';
import ModalCovid19 from '../../base/Modal/modal_covid19/modal_covid19';
//Css
import './homePage.scss'

export const HomePage = () => {
  const user = useSelector(state => state.user)
  
  return (
    <div id="body-wrapper" className="animsition">
        <Header/>
        <div id="content">
            <Carousel/>
            <SectionAbout/>
            <SectionStep/>
            <SectionMenu/>
            <SectionOffers/>
            <SectionVideo/>
        </div>
        <ModalCovid19  user={user} />
        <Footer/>
        <CookieBar user={user}/>
    </div>
    
  );
};

export default HomePage;
