import React, { useState, useEffect, useRef } from 'react'

import './section_step.scss'

function SectionStep() {
  return (
        // <!-- Section - About -->
        <section className="section section-extended right dark">

            <div className="container bg-dark">
                <div className="row">
                    <div className="col-md-4">
                        {/* <!-- Step --> */}
                        <div className="feature feature-1 mb-md-0">
                            <div className="feature-icon icon icon-primary"><i className="ti ti-shopping-cart"></i></div>
                            <div className="feature-content">
                                <h4 className="mb-2"><a href="menu-list-collapse.html">Pick a dish</a></h4>
                                <p className="text-muted mb-0">Vivamus volutpat leo dictum risus ullamcorper condimentum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* <!-- Step --> */}
                        <div className="feature feature-1 mb-md-0">
                            <div className="feature-icon icon icon-primary"><i className="ti ti-wallet"></i></div>
                            <div className="feature-content">
                                <h4 className="mb-2">Make a payment</h4>
                                <p className="text-muted mb-0">Vivamus volutpat leo dictum risus ullamcorper condimentum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* <!-- Step --> */}
                        <div className="feature feature-1 mb-md-0">
                            <div className="feature-icon icon icon-primary"><i className="ti ti-package"></i></div>
                            <div className="feature-content">
                                <h4 className="mb-2">Recieve your food!</h4>
                                <p className="text-muted mb-3">Vivamus volutpat leo dictum risus ullamcorper condimentum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default SectionStep;
