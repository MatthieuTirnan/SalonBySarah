import {useEffect, useState} from "react";
import {getArticle, postArticle} from "../../helper/fetch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../../asset/style/article.scss'
export const Article = () => {
    const navigate = useNavigate()
    const state = useSelector(state => state)
    const [articles, setArticles] = useState([])
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})

    useEffect(() => {
        actualiseArticle()
    }, [])
    useEffect(() => {
        console.log(articles)
    }, [articles])

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
            .then((res) => {

                alert(res.message)
                actualiseArticle()
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return <main>
        {state.user.isAdmin &&
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Ajouter un article</legend>
                    <label htmlFor="titre">TITRE</label>
                    <input onChange={(e) => setTitre(e.target.value)} type="text" id="titre" name="titre"/>

                    <label>Contenu de votre article </label>
                    <textarea onChange={(e) => setDescription(e.target.value)} name="description"></textarea>

                    <label htmlFor="fichier">ajouter une image</label>
                    <input onChange={(e) => setFichier(e.target.files[0])} type="file" name="fichier"/>


                    <button type="submit">ENVOYER</button>
                </fieldset>
            </form>}
        {articles.length === 0 ? (
            <div>Aucun article</div>
        ) : (
            <section className="section-article">
                {articles.map((e, i) => {
                function handleClick() {
                    navigate(`/article-management`, {state: e});
                }

                return (
                    <article key={i}>
                        <h2>{e.titre}</h2>
                        {e.imagepath &&
                            <div className="image-article-container">
                                <img src={e.imagepath} alt={e.image.alt}/>
                            </div>
                        }
                        <p>{e.description}</p>
                        {state.user.isAdmin &&
                            <button onClick={handleClick}>MODIFIER</button>
                        }
                    </article>
                )
            })}
            </section>
        )}

    </main>
}