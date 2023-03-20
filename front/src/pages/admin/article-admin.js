import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {deleteArticle, putArticle} from "../../helper/fetch";
import "../../asset/style/article-management.scss"
export const ArticleManagement = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const currentarticle = location.state;
    const [article, setArticle] = useState(currentarticle)
    const [fichier, setFichier] = useState({})


    function handleChange(e) {
        const {name, value} = e.target;
        setArticle(prevState => ({...prevState, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData();
        formData.append("id", article._id)
        formData.append("titre", article.titre);
        formData.append("description", article.description);
        if (fichier !== undefined) {
            formData.append("fichier", fichier);
        }
        putArticle(formData)
            .then((res) => {
                alert(res.message)
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleDeleteClick() {
        const id = article._id
        deleteArticle(id)
            .then(() => {

                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <main>
            <article className="modif-article">
                <h2>{currentarticle.titre}</h2>
                {currentarticle.imagepath &&
                    <div className="image-article-container">
                        <img src={currentarticle.imagepath} alt={currentarticle.image.alt}/>
                    </div>
                }
                <p>{currentarticle.description}</p>
            </article>
            <button onClick={handleDeleteClick}>SUPPRIME ARTICLE</button>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Modifier l'article</legend>
                    <label htmlFor="titre">TITRE</label>
                    <input onChange={handleChange} defaultValue={article.titre} type="text" id="titre" name="titre"/>

                    <label>Contenu de votre article </label>
                    <textarea onChange={handleChange} defaultValue={article.description} name="description"></textarea>

                    <label htmlFor="fichier">modifier une image</label>
                    <input onChange={(e) => setFichier(e.target.files[0])} type="file" name="fichier"/>


                    <button type="submit">ENVOYER</button>
                </fieldset>
            </form>
        </main>
    )
}