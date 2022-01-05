import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { showHideDetailProduct } from '../../../../../store/productReducer'
import ModalDetailFood from '../../../Modal/modalDetailFood/modalDetailFood';
import { formatCurrency } from '../../../../core/utils/format'

import './foodItem.scss'

function FoodItem(props) {
    
    const { formatMessage } = useIntl();

    const { productItem } = props
    const [ isShowModalDetailFood, setIsShowModalDetailFood ] = useState(false)

    const dispatch =  useDispatch();

    return (
        <>
        <div className="col-lg-4 col-6 food-item">
            <div className="menu-item menu-grid-item">
                <div className="image-title-container">
                    <img className="mb-4" src={productItem.image} alt="" ></img>
                    <h6 className="mb-0">{productItem.name}</h6>
                </div>
                <span className="text-muted food-item-description text-sm">{productItem.description}</span>
                <div className="row align-items-center mt-4">
                    <div className="col-sm-6"><span className="text-md mr-4">
                        <span className="text-muted">from</span> $<span data-product-base-price="">{formatCurrency(productItem.price)}</span></span></div>
                    <div className="col-sm-6 text-sm-right mt-2 mt-sm-0">
                        <button className="btn btn-outline-secondary btn-sm" 
                        data-action="open-cart-modal" data-id="1" onClick={() => setIsShowModalDetailFood(true)}>
                            <span>Add to cart</span></button>
                    </div>
                </div>
            </div>
        </div>
        {
            isShowModalDetailFood && 
            <ModalDetailFood 
            productItem={productItem}
            isShowModalDetailFood={isShowModalDetailFood}
            setIsShowModalDetailFood={setIsShowModalDetailFood}/>
        }
        </>
    );
}

export default FoodItem;
