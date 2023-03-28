import {useEffect, useState} from "react";
import {deleteImage, getGalerie, postImageGalerie} from "../../helper/fetch";
import {useSelector} from "react-redux";
import "../../asset/style/galerie.scss"
import {toastError, toastSuccess} from "../../components/toast/toast";

export const Galerie = () => {

    const state = useSelector(state => state)
    const lien = process.env.REACT_APP_LINK_BACK
    const [galerie, setGalerie] = useState([])
    const [fichier, setFichier] = useState({})

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


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fichier", fichier);

        postImageGalerie(formData)
            .then((res) => {
                if (res.message === 'fichier manquant') {
                    toastError(res.message)
                } else if (res.message === 'Unsupported image file type') {
                    toastError(res.message)
                } else {
                    toastSuccess(res.message)
                }
                actualiseGalerie()
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <main>
            {state.user.isAdmin &&
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Ajouter une image</legend>
                        <input onChange={(e) => setFichier(e.target.files[0])} type="file" name="fichier"/>
                        <button type="submit">ENVOYER</button>
                    </fieldset>
                </form>
            }
            <article className="galerie-container">

                {galerie.slice(0).reverse().map((e, i) => {
                    function handleDelete() {
                        const id = e._id
                        deleteImage(id)
                            .then((res) => {
                                toastSuccess("image supprimée")
                                getGalerie()
                                    .then(res => {
                                        setGalerie(res.data)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }

                    return (
                        <div key={i} className="image-container">
                            <a href={lien + e.src}><img src={lien + e.src} alt={e.alt}/></a>
                            {state.user.isAdmin &&
                                <button onClick={handleDelete}>supprimer</button>
                            }
                        </div>
                    )
                })
                }
            </article>
        </main>
    )
}



