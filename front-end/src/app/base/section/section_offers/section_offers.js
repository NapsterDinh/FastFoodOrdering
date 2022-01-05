import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import  Slider from 'react-slick'
import CarouselSectionOffersItem from '../section_offers/carousel_section_offers_item/carousel_section_offers_item'

import './section_offers.scss'

function SectionOffers()
{
    const { formatMessage } = useIntl();

    const settings = {
        "dots": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "infinite": true,
        "responsive": [
            {
                "breakpoint": 991,
                "settings": {
                    "slidesToShow": 2,
                    "slidesToScroll": 1
                }
            },
            {
                "breakpoint": 690,
                "settings": {
                    "slidesToShow": 1,
                    "slidesToScroll": 1
                }
            }
        ]
    };

    return (
        <section className="section bg-light">
            <div className="container">
                <h1 className="text-center mb-6">Our menu</h1>
                <Slider 
                    className=".section-slider"
                    {...settings}>
                        <CarouselSectionOffersItem/>
                        <CarouselSectionOffersItem/>
                        <CarouselSectionOffersItem/>
                        <CarouselSectionOffersItem/>
                </Slider>
            </div>
        </section>     
    )
}

export default SectionOffers