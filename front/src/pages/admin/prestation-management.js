import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deletePrestation, deleteUser, getPrestation, getUser, updatePrestation, updateUser} from "../../helper/fetch";
import {prestation} from "../../store/slices/prestation";
import {listUsers} from "../../store/slices/listUserSlice";

export const PrestationManagement = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [formDisplay, setFormDisplay] = useState("hidden")
    const [currentPrestation, setCurrentPrestation] = useState({})
    useEffect(() => {
        getPrestation()
            .then((res) => {
                dispatch(prestation(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log(currentPrestation)
    }, [currentPrestation])

    function handleSubmit (e) {

        e.preventDefault()

        setFormDisplay("hidden")
        console.log(currentPrestation)

        updatePrestation(currentPrestation)
            .then((res) => {
                console.log(res)
                getPrestation()
                    .then((res) => {
                        console.log(res)
                        dispatch(prestation(res))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
 function handleChange (e){
         const { name, value } = e.target;
         setCurrentPrestation(prevState => ({ ...prevState, [name]: value }));
 }
    return (
        <main>
            {state.prestation.prestation === false &&
                <div>aucune prestation</div>
            }
            {state.prestation.data &&
                <>
                    <form method="put" onSubmit={handleSubmit} className={formDisplay}>


                        <label htmlFor="genre">genre</label>
                        <input onChange={handleChange} defaultValue={currentPrestation.genre} type="text" id="genre" name="genre"/>

                        <label htmlFor="prestation">prestation</label>
                        <input onChange={handleChange} defaultValue={currentPrestation.prestation} type="text" id="prestation"
                               name="prestation"/>

                        <label htmlFor="price">price</label>
                        <input onChange={handleChange} defaultValue={currentPrestation.price} type="text" id="price" name="price"/>


                        <button type="submit">ENVOYER</button>

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
                                        getPrestation()
                                            .then((res) => {
                                                dispatch(prestation(res))
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
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
                                            onClick={handleDeleteClick}>supprimé
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