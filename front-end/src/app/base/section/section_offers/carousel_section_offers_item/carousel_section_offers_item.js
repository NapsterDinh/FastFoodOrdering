import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';

import './carousel_section_offers_item.scss'

function CarouselSectionOffersItem()
{
    const { formatMessage } = useIntl();

    return (
        <div className="special-offer">
            <img src="/slider-burger.jpg" alt="" className="special-offer-image"></img>
            <div className="special-offer-content">
                <h2 className="mb-2">Free Burger</h2>
                <h5 className="text-muted mb-5">Get free burger from orders higher that $40!</h5>
                <ul className="list-check text-lg mb-0">
                    <li>Only on Tuesdays</li>
                    <li className="false">Order higher that $40</li>
                    <li>Unless one burger ordered</li>
                </ul>
            </div>
        </div>
    )
}

export default CarouselSectionOffersItem