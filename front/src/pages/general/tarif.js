import {getPrestation} from "../../helper/fetch";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {prestation} from "../../store/slices/prestation";
import "../../asset/style/tarif.scss"

export const Tarif = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState("")
    const [hommeDisplay, setHommeDisplay] = useState("")
    const [femmeDisplay, setFemmeDisplay] = useState("")


    useEffect(() => {
        actualisePrestation()
    }, [])

    useEffect(() => {
        if (state.prestation.data) {
            const homme = state.prestation.data.some(e => e.genre === "Homme")
            const femme = state.prestation.data.some(e => e.genre === "Femme")

            if (!femme) {
                setFemmeDisplay("hidden-tarif")
            }
            if (!homme) {
                setHommeDisplay("hidden-tarif")
            }
        }
    }, [state.prestation.data, hommeDisplay, femmeDisplay])


    function actualisePrestation() {
        getPrestation()
            .then((res) => {
                dispatch(prestation(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (<main>
        {state.prestation.count === 0 || state.prestation.prestation === false ? (<div>aucune prestation</div>) : (<>
            <section className="select-tarif">
                <button onClick={(e) => {
                    setHidden()
                    setHommeDisplay()
                    setFemmeDisplay()
                }}>ALL
                </button>
                <button onClick={(e) => {
                    setHidden("hidden-tarif")
                    setFemmeDisplay("femme-tarif")
                    setHommeDisplay()
                }}>FEMME
                </button>
                <button onClick={(e) => {
                    setHidden("hidden-tarif")
                    setHommeDisplay("homme-tarif")
                    setFemmeDisplay()
                }}>HOMME
                </button>
            </section>
            <section className={"categorie-prestation " + hidden + " " + femmeDisplay}>
                <h2>catégorie : Femme</h2>
                {state.prestation.data.map((e, i) => {
                    if (e.genre === "Femme") {
                        return (<div key={i} className="prestation-wrapper">
                            <p>{e.prestation}</p>
                            <p>{e.price} €</p>
                        </div>)
                    }
                })}
            </section>
            <section className={"categorie-prestation " + hidden + " " + hommeDisplay}>
                <h2>catégorie : Homme</h2>
                {state.prestation.data.map((e, i) => {
                    if (e.genre === "Homme") {
                        return (<div key={i} className="prestation-wrapper">
                            <p>{e.prestation}</p>
                            <p>{e.price} €</p>
                        </div>)
                    }
                })}
            </section>
        </>)}
    </main>)
}