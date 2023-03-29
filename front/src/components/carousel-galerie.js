import {useEffect, useState} from "react";
import {getGalerie} from "../helper/fetch";
import Slider from "react-slick";
import "../asset/style/carousel.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Carousel = () => {
    const [galerie, setGalerie] = useState([])
    const lien =process.env.REACT_APP_LINK_BACK
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
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplaySpeed: 2000,
        speed: 5000,
        cssEase: "linear",

        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint:  690,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <h2>Réalisation</h2>
            {galerie.length !== 0 &&
                <Slider {...settings}>
                    {galerie.map((e, i) => {
                        return (
                            <div className="img-carousel-wrapper" key={i} >
                                <img className="img-carousel" src={lien+e.src} alt={e.alt}/>
                            </div>
                        )
                    })
                    }
                </Slider>
            }
        </>
    )
}