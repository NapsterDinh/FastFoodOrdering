import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom'
import './carousel_item.scss'

function CarouselItem()
{
    const { formatMessage } = useIntl();
    const history = useHistory();
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const goToPage = (url) => {
        history.replace(url)
    }

    return (
        <div className="content-slider">
            <div className="bg-image">
                <img src="/slider-burger_dark.jpg" alt=""></img>
            </div>
                
            <div className="container">
                <h1 className="display-2 mb-2">Delicious Desserts</h1>
                <h4 className="text-muted mb-5">Order it online even now!</h4>
                <a onClick={() => goToPage('/categories')} className="btn btn-outline-primary btn-lg"><span>Order now!</span></a>
            </div>
        </div>
    )
}

export default CarouselItem