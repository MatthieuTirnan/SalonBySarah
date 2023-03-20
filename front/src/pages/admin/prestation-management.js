import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deletePrestation, getPrestation, postPrestation, updatePrestation} from "../../helper/fetch";
import {prestation} from "../../store/slices/prestation";


export const PrestationManagement = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [formDisplay, setFormDisplay] = useState("hidden")
    const [currentPrestation, setCurrentPrestation] = useState({})

    const [addGenre, setAddGenre] = useState("Homme")
    const [addprestation, setAddPrestation] = useState("")
    const [addprice, setAddPrice] = useState("")
    useEffect(() => {
        actualiseDisplay()
    }, [])

    function actualiseDisplay() {
        getPrestation()
            .then((res) => {
                console.log(res)
                dispatch(prestation(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        console.log(addGenre, addprestation, addprice)
    }, [addGenre, addprestation, addprice])

    function handleSubmitPut(e) {

        e.preventDefault()

        setFormDisplay("hidden")
        console.log(currentPrestation)

        updatePrestation(currentPrestation)
            .then((res) => {
                console.log(res)
                actualiseDisplay()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setCurrentPrestation(prevState => ({...prevState, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault()
        postPrestation(addGenre, addprestation, addprice)
            .then((res) => {
                console.log(res)
                actualiseDisplay()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <main>
            <form method="POST" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Ajouter une prestation</legend>
                    <label htmlFor="genre">genre</label>
                    <select name="genre" id="genre" onChange={(e) => {
                        setAddGenre(e.target.value)
                    }}>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>

                    </select>

                    <label htmlFor="prestation">prestation</label>
                    <input onChange={(e) => {
                        setAddPrestation(e.target.value)
                    }} placeholder="prestation" type="text"
                           id="prestation"
                           name="prestation"/>

                    <label htmlFor="price">price</label>
                    <input onChange={(e) => {
                        setAddPrice(e.target.value)
                    }} placeholder="price" type="number" id="price"
                           name="price"/>

                    <button type="submit">ENVOYER</button>
                </fieldset>
            </form>
            {state.prestation.prestation === false &&
                <div>aucune prestation</div>
            }
            {state.prestation.data &&
                <>
                    <form method="put" onSubmit={handleSubmitPut} className={formDisplay}>
                        <fieldset>
                            <legend>modifier la prestation</legend>
                            <label htmlFor="genre">genre</label>
                            <input onChange={handleChange} defaultValue={currentPrestation.genre} type="text" id="genre"
                                   name="genre"/>

                            <label htmlFor="prestation">prestation</label>
                            <input onChange={handleChange} defaultValue={currentPrestation.prestation} type="text"
                                   id="prestation"
                                   name="prestation"/>

                            <label htmlFor="price">price</label>
                            <input onChange={handleChange} defaultValue={currentPrestation.price} type="text" id="price"
                                   name="price"/>


                            <button type="submit">ENVOYER</button>
                        </fieldset>
                    </form>
                    <table>
                        <thead>
                        <tr>
                            <th>genre</th>
                            <th>prestation</th>
                            <th> price</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.prestation.data.map((e, i) => {
                            const id = e._id
                            function handleDeleteClick() {
                                deletePrestation(id)
                                    .then((res) => {
                                        console.log(res)
                                        actualiseDisplay()
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                            return (

                                <tr key={i}>
                                    <td>{e.genre}</td>
                                    <td>{e.prestation}</td>
                                    <td>{e.price}</td>
                                    <td>
                                        <button onClick={(event) => {
                                            setFormDisplay("visible")
                                            setCurrentPrestation(e)
                                        }}>modifier
                                        </button>

                                    </td>
                                    <td>
                                        <button
                                            onClick={handleDeleteClick}>supprimer
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                </>
            }
        </main>
    )
}