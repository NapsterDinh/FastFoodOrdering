import React, { useState, useEffect, useRef } from 'react'

import './section_Title.scss'

function SectionTitle(props) {
    const { objectSectionTilteContent } = props
    return (
        <div className="page-title bg-dark">
            <div className="bg-image bg-parallax" style={{backgroundImage: 'none'}} data-jarallax-original-styles="background-image: url(&quot;http://assets.suelo.pl/soup/img/photos/bg-croissant.jpg&quot;);">
                <img src="" alt="" style={{display: 'none'}}></img>
                <div id="jarallax-container-0" style={{
                    position: 'absolute',
                    top: '0px',
                    left:  '0px',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: '-100'
                }}>
                    <div style={{
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${objectSectionTilteContent.image})`,
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '1355px',
                        height: '408.754px',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        marginTop: '264.123px',
                        transform: 'translate3d(0px, -289.123px, 0px)'
                    }}></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-4">
                        <h1 style={{color: 'white'}} className="mb-0">{objectSectionTilteContent.title}</h1>
                        <h4 style={{color: 'hsla(0,0%,100%,.5)'}} className="text-muted mb-0">{objectSectionTilteContent.content}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionTitle;
