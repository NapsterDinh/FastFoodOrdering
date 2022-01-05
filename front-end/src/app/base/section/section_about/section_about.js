import React, { useState, useEffect, useRef } from 'react'

import './section_about.scss'

function SectionAbout() {
  return (
    // <!-- Section - About -->
        <section className="section section-bg-edge">
                <div className="image right col-md-6 offset-md-6">
                    <div className="bg-image">
                        <img src="/bg-food.jpg" alt=""></img></div>
                </div>

                <div className="container">
                    <div className="col-lg-5 col-md-9">
                        <div className="rate mb-5 rate-lg"><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star"></i></div>
                        <h1>The best food in London!</h1>
                        <p className="lead text-muted mb-5">Donec a eros metus. Vivamus volutpat leo dictum risus ullamcorper condimentum. Cras sollicitudin varius condimentum. Praesent a dolor sem....</p>
                        <div className="blockquotes">
                            {/* <!-- Blockquote --> */}
                            <blockquote className="blockquote light animated animate__animated animate__fadeInLeft visible" data-animation="fadeInLeft">
                                <div className="blockquote-content">
                                    <div className="rate rate-sm mb-3"><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star"></i></div>
                                    <p>It’ was amazing feeling for my belly!</p>
                                </div>
                                <footer>
                                    <img src="" alt=""></img>
                                    <span className="name">Mark Johnson<span className="text-muted">, Google</span></span>
                                </footer>
                            </blockquote>
                            {/* <!-- Blockquote --> */}
                            <blockquote className="blockquote animated animate__animated animate__fadeInRight visible" data-animation="fadeInRight" data-animation-delay="300">
                                <div className="blockquote-content dark">
                                    <div className="rate rate-sm mb-3"><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star"></i></div>
                                    <p>Great food and great atmosphere!</p>
                                </div>
                                <footer>
                                    <img src="" alt=""></img>
                                    <span className="name">Kate Hudson<span className="text-muted">, LinkedIn</span></span>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>

            </section>
    );
}

export default SectionAbout;
