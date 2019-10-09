import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from 'react-responsive-carousel';
import React from "react"

const PhotosCarousel = props => {
    let { photosSlideShow } = props.location.state
    return (
        <div className="container-fluid mt-3">
            <Carousel dynamicHeight={true}>
                {photosSlideShow.map((pictureItem, index) => {
                    return (
                        <div key={index}>
                            <img src={pictureItem.urlName} alt="" />
                            {/* <p className="legend">Legend {index}</p> */}
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default PhotosCarousel