import {useEffect, useState} from "react";
import {getGalerie} from "../helper/fetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const Carousel = () => {
    const [galerie, setGalerie] = useState([])

    useEffect(() => {
        actualiseGalerie()

    }, [])


    function actualiseGalerie() {
        getGalerie()
            .then(res => {
                setGalerie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            {galerie.length !== 0 &&
                <Slider {...settings}>
                    <div>slide</div>
                    <div>slide2</div>
                    {galerie.map((e, i) => {

                        return (
                            <div key={i}>
                                <img src={e.src} alt={e.alt}/>
                            </div>)
                    })
                    }
                </Slider>
            }
        </>
    )
}