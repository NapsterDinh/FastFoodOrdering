import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';

import './menuNavigation.scss'
import { getAllCategory } from '../../../core/apis/category'
import { todoProduct } from '../../../../store/cartReducer'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import configuration from '../../../../configuration';

function MenuNavigation(props) {
    
    const { formatMessage } = useIntl();
    const [ stateToogle, setStateToogle] = useState(false)
    const [ indexRef, setIndexRef ] = useState(-1)
    const [ categoriesList, setCategoriesList ] = useState([])
    const { match } = props
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const fetchListCategory = async () => {
          //pending response
          dispatch(todoProduct({
            type: "FETCH_PRODUCTS_PENDING"
            }
        )) 
          let res = await getAllCategory();
          if (res && res.data.result) {
            setCategoriesList(res.data.data)
          } else {
              //error
            dispatch(todoProduct({
                type: "FETCH_PRODUCTS_ERROR",
                error: res.data.msg
            }
        ))  
          }
        }
        fetchListCategory()
    }, [])
    return (
        <nav id="menu-navigation" className="stick-to-content" data-local-scroll="">
            <ul className="nav nav-menu bg-dark dark">
                <NavLink to={`/categories`} exact className="link-container" activeClassName='selected'>
                    <li className="nav-item">
                        <div className="nav-item-container">
                            All products 
                        </div>
                    </li>
                </NavLink>
                {
                    categoriesList &&
                    categoriesList.map((item,index) => (
                        <NavLink key={index} to={`/categories/${item._id}`} className="link-container" activeClassName='selected'>
                            <li className="nav-item">
                                <div className="nav-item-container">
                                    {item.name}
                                    {/* <i className="fa fa-caret-down" aria-hidden="true"></i> */}
                                </div>
                            </li>
                        </NavLink>  
                    ))
                }
            </ul>
        </nav>
    );
}

export default MenuNavigation;
