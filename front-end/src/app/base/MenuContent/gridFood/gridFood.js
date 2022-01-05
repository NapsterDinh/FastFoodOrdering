import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import './gridFood.scss'
import FoodItem from '../gridFood/foodItem/foodItem'
import { todoProduct } from '../../../../store/cartReducer'
import { getListProductByIdCategory } from '../../../core/apis/product'

function GridFood(props) {
    
    const { formatMessage } = useIntl();
    const dispatch =  useDispatch();
    const { match, setIsActive } = props

    const [ products, setProducts ] = useState([])
    const [ isHideEmptyNoti, setIsHideEmptyNoti ] = useState(false)

    useEffect(() => {
        const fectchListProduct = async () => {
            //pending response
            setIsHideEmptyNoti(true)
            setIsActive(true)
            dispatch(todoProduct({
                type: "FETCH_PRODUCTS_PENDING"
            }
        )) 
            let res = await getListProductByIdCategory(match.params.categoryId);
            if (res && res.data.result) {
                if(res.data.data.length === 0)
                {
                    setIsHideEmptyNoti(false)
                }
                else
                {
                    setIsHideEmptyNoti(true)
                }
                setProducts(res.data.data)
            } else {
                //error
              dispatch(todoProduct(
                {
                    type: "FETCH_PRODUCTS_ERROR",
                    error: res.data.msg
                }))  
            }
            setIsActive(false)
          }
          fectchListProduct()
    }, [match.params.categoryId])

    return (
        <div className="menu-category">
            {/* <div className="menu-category-title">
                <div className="bg-image">
                    <img src="/bg-burger2.jpg" alt=""></img>
                </div>
                <h2 className="title">Burgers</h2>
            </div> */}
            <div className="menu-category-content padded">
                <div className="row gutters-sm">
                    {/* <!-- Menu Item --> */}
                    {
                        !isHideEmptyNoti &&
                        <div className="empty-product-container">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <h3>Can't find suitable products</h3>
                        </div>
                    }
                    {
                        products.map((item,index) => (
                            <FoodItem key={item._id} productItem={item} />
                        ))
                    }
                </div>
            </div>
        </div>
        
    );
}

export default GridFood;
