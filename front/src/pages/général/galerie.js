import {useEffect} from "react";
import {getGalerie} from "../../helper/fetch";

export const Galerie = () => {
    useEffect(() => {
        getGalerie()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
        </>
    )
}