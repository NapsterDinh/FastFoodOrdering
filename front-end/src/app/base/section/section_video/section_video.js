import React, { useState, useEffect, useRef } from 'react'

import './section_video.scss'

function SectionVideo() {
  return (
        // <!-- Section -->
        <section className="section section-lg dark bg-dark">

            {/* <!-- BG Image --> */}
            <div className="bg-image bg-fixed">
                <img src="" alt=""></img>

            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <a type="button" href="https://www.youtube.com/embed/uVju5--RqtY" className="btn-play mb-5" data-toggle="video-modal" data-target="#modalVideo" data-video="https://www.youtube.com/embed/uVju5--RqtY"></a>
                        <h1 className="display-2">Check our <strong>promo</strong> video!</h1>
                        <h4 className="text-muted mb-5">Taste it now with our online order!</h4>
                        <a href="page-offers.html" className="btn btn-outline-primary btn-lg"><span>Order now</span></a>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SectionVideo;
