import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { hidePanelCart } from "../../../../store/userReducer";

import messages from '../../../core/msg/header';

import './panel_mobile.scss'

function PanelMobile()
{
    const { formatMessage } = useIntl();
    // Retrieve data from redux store
    //const togglePanelCart = useSelector((state) => state.value);
    let togglePanelMobile = useSelector((state) => state.user.value);
    const dispatch =  useDispatch();
    const handelPanel = (status) =>{
        const action = hidePanelCart(status)
        dispatch(action)
    }

    return (
        <Modal
            show={togglePanelMobile}
            onHide={() => handelPanel('HIDE')}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            id="panel-mobile"
            >
                <div className="module module-logo bg-dark dark">
                    <a href="#">
                        <img src="assets/img/logo-light.svg" alt="" width="88"></img>
                    </a>
                    <button className="close" data-toggle="panel-mobile"><i className="ti ti-close"></i></button>
                </div>
                <nav className="module module-navigation">
                    <ul id="nav-main-mobile" className="nav nav-main-mobile">
                        <li className="has-dropdown">
                            <a href="#">Home</a>
                            <div className="dropdown-container" style="display: none;">
                                <ul>
                                    <li><a href="index.html">Home Basic</a></li>
                                    <li><a href="index-burgers.html">Home Burgers</a></li>
                                    <li><a href="index-slider.html">Home Fullwidth Slider</a></li>
                                    <li><a href="index-video.html">Home Video</a></li>
                                    <li><a href="index-fresh.html">Home Fresh <span className="badge badge-success">New</span></a></li>
                                    <li><a href="index-dark.html">Home Dark <span className="badge badge-success">New</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="has-dropdown">
                            <a href="#">About</a>
                            <div className="dropdown-container">
                                <ul className="dropdown-mega">
                                    <li><a href="page-about.html">About Us</a></li>
                                    <li><a href="page-services.html">Services</a></li>
                                    <li><a href="page-gallery.html">Gallery</a></li>
                                    <li><a href="page-reviews.html">Reviews</a></li>
                                    <li><a href="page-faq.html">FAQ</a></li>
                                </ul>
                                <div className="dropdown-image">
                                    <img src="../../assets.suelo.pl/soup/img/photos/dropdown-about.jpg" alt=""></img>
                                </div>
                            </div>
                        </li>
                        <li className="has-dropdown">
                            <a href="#">Menu</a>
                            <div className="dropdown-container">
                                <ul>
                                    <li className="has-dropdown">
                                        <a href="#">List</a>
                                        <ul>
                                            <li><a href="menu-list-navigation.html">Navigation</a></li>
                                            <li><a href="menu-list-collapse.html">Collapse</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-dropdown">
                                        <a href="#">Grid</a>
                                        <ul>
                                            <li><a href="menu-grid-navigation.html">Navigation</a></li>
                                            <li><a href="menu-grid-collapse.html">Collapse</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="page-offers.html">Offers</a></li>
                        <li><a href="page-contact.html">Contact</a></li>
                        <li className="has-dropdown">
                            <a href="#">More</a>
                            <div className="dropdown-container">
                                <ul className="dropdown-mega">
                                    <li><a href="page-offer-single.html">Offer single</a></li>
                                    <li><a href="page-product.html">Product</a></li>
                                    <li><a href="book-a-table.html">Book a table</a></li>
                                    <li><a href="checkout.html">Checkout</a></li>
                                    <li><a href="confirmation.html">Confirmation</a></li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="blog-sidebar.html">Blog + Sidebar</a></li>
                                    <li><a href="blog-post.html">Blog Post</a></li>
                                    <li><a href="documentation/index.html" target="_blank">Documentation</a></li>
                                </ul>
                                <div className="dropdown-image">
                                    <img src="../../assets.suelo.pl/soup/img/photos/dropdown-more.jpg" alt=""></img>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="module module-social">
                    <h6 className="text-sm mb-3">Follow Us!</h6>
                    <a href="#" className="icon icon-social icon-circle icon-sm icon-facebook"><i className="fa fa-facebook"></i></a>
                    <a href="#" className="icon icon-social icon-circle icon-sm icon-google"><i className="fa fa-google"></i></a>
                    <a href="#" className="icon icon-social icon-circle icon-sm icon-twitter"><i className="fa fa-twitter"></i></a>
                    <a href="#" className="icon icon-social icon-circle icon-sm icon-youtube"><i className="fa fa-youtube"></i></a>
                    <a href="#" className="icon icon-social icon-circle icon-sm icon-instagram"><i className="fa fa-instagram"></i></a>
                </div>
           
        </Modal>   
    )
}

export default PanelMobile