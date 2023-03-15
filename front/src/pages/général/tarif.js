import {getPrestation} from "../../helper/fetch";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {prestation} from "../../store/slices/prestation";

export const Tarif = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(state.prestation)
    useEffect(() => {
        actualisePrestation()
    }, [])

    function actualisePrestation() {
        getPrestation()
            .then((res) => {
                console.log(res)
                dispatch(prestation(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <main>
            {state.prestation.prestation === false ? (
                <div>aucune prestation</div>
            ) : (
                state.prestation.data.map((e, i) => {
                    return (
                        <div key={i}>
                            <p>{e.prestation}</p>
                            <p>{e.price} €</p>
                            <p></p>
                        </div>
                    )
                })
            )}

        </main>
    )
}