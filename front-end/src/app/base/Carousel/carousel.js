import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import  Slider from 'react-slick'
import  CarouselItem  from './carousel_item/carousel_item';

import messages from '../../core/msg/header.js';

import './carousel.scss'

function Carousel()
{
    const { formatMessage } = useIntl();

    const settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <section className="section section-main section-main-2 bg-dark dark">
            <Slider 
            className=".section-slider"
            {...settings}>
                <CarouselItem/>
                <CarouselItem/>
                <CarouselItem/>
                <CarouselItem/>
            </Slider>
        </section>     
    )
}

export default Carousel