import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import  Slider from 'react-slick'
import CarouselSectionMenuItem from '../section_menu/carousel_section_menu_item/carousel_section_menu_item'

import './section_menu.scss'

function SectionMenu()
{
    const { formatMessage } = useIntl();

    const settings = {
        "dots": true,
        "slidesToShow": 3,
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
        <section className="section pb-0 protrude">
            <div className="container">
                <h1 className="mb-6">Our menu</h1>
            </div>
            <Slider 
            className=".section-slider"
            {...settings}>
                <CarouselSectionMenuItem/>
                <CarouselSectionMenuItem/>
                <CarouselSectionMenuItem/>
                <CarouselSectionMenuItem/>
            </Slider>
        </section>     
    )
}

export default SectionMenu