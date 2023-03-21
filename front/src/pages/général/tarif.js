import {getPrestation} from "../../helper/fetch";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {prestation} from "../../store/slices/prestation";
import "../../asset/style/tarif.scss"

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

    return (<main>
        {state.prestation.prestation === false ? (<div>aucune prestation</div>) : (
            <>
                <section className="categorie-prestation">
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

                <section className="categorie-prestation">
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
            </>

        )}

    </main>)
}