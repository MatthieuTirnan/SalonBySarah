import {useEffect, useState} from "react";
import {deleteImage, getGalerie, postImageGalerie} from "../../helper/fetch";
import {useSelector} from "react-redux";

export const Galerie = () => {
    const state = useSelector(state => state)

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
        console.log(fichier)
        const formData = new FormData();
        formData.append("fichier", fichier);

        postImageGalerie(formData)
            .then((res) => {

                actualiseGalerie()
                alert(res.message)
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

                {galerie.map((e, i) => {
                    function handleDelete() {
                        console.log(e)
                        const id = e._id
                        deleteImage(id)
                            .then((res) => {
                                console.log(res)
                                getGalerie()
                                    .then(res => {
                                        console.log(res)
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
                            <img src={e.src} alt={e.alt}/>
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