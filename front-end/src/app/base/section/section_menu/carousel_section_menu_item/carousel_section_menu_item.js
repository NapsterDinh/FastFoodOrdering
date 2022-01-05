import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';

import './carousel_section_menu_item.scss'

function CarouselSectionMenuItem()
{
    const { formatMessage } = useIntl();

    return (
        <div className="menu-sample">
                <a href="menu-list-navigation.html#Pasta">
                    <img src="/slider-burger_dark.jpg" alt="" className="image"></img>
                    <h3 className="title">Pasta</h3>
                </a>
        </div>
    )
}

export default CarouselSectionMenuItem