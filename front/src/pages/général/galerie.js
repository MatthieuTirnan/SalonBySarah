import {useEffect, useState} from "react";
import {getGalerie, postImageGalerie} from "../../helper/fetch";
import {useSelector} from "react-redux";

export const Galerie = () => {
    const state = useSelector(state => state)

    const [Galerie, setGalerie] = useState([])
    const [fichier, setFichier] = useState({})

    useEffect(() => {
        getGalerie()
            .then(res => {
                console.log(res)
                setGalerie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    useEffect(() => {
        console.log(Galerie)
    }, [Galerie])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(fichier)
        const formData = new FormData();
        formData.append("fichier", fichier);
        postImageGalerie(formData)
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
                alert(res.message)
            })
            .catch((err) => {
                console.log(err)
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

            {Galerie.map((e,i)=>{
                return(
                    <>
                        <div key={i} className="image-container">
                            <img src={e.src} alt={e.alt}/>
                        </div>
                    </>
                )
            })
            }
            </article>
        </main>
    )
}