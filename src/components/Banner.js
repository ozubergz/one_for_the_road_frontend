import React from 'react';
import bannerLogo from '../images/banner-logo.png'

const Banner = () => {
    return (
        <div className="banner">
            <img className="banner-logo" src={bannerLogo} alt="Banner Logo" />
        </div>
    )
    
}

export default Banner;