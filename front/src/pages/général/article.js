import {useEffect, useState} from "react";
import {getArticle, postArticle} from "../../helper/fetch";
import {useSelector} from "react-redux";

export const Article = () => {
    const state = useSelector(state => state)
    const [articles, setArticles] = useState([])
    const [titre,setTitre] = useState("")
    const [description,setDescription]= useState("")
    const [fichier,setFichier]= useState({})
    useEffect(() => {
        actualiseArticle()
    }, [])
    useEffect(() => {
        console.log(titre,description,fichier,articles)
    }, [titre,description,fichier,articles])

    function actualiseArticle() {
        getArticle()
            .then((res) => {
                setArticles(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("fichier", fichier);

        postArticle(formData)
            .then((res)=>{
                console.log(res)
                alert(res.message)
                actualiseArticle()
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    return (
        <main>
            {state.user.isAdmin &&
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Ajouter un article</legend>
                        <label htmlFor ="titre">TITRE</label>
                        <input onChange={(e)=> setTitre( e.target.value)} type="text" id="titre" name="titre"/>

                        <label>Contenu de votre article </label>
                        <textarea onChange={(e)=> setDescription( e.target.value)}   name="description"></textarea>

                        <label htmlFor="fichier">ajouter une image</label>
                        <input onChange={(e)=> setFichier( e.target.files[0] )} type="file" name="fichier"/>


                        <button type="submit">ENVOYER</button>
                    </fieldset>
                </form>
            }
        </main>
    )
}