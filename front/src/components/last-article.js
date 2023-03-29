import {useEffect, useState} from "react";
import {getArticle} from "../helper/fetch";

export const LastArticle = () => {
    const [articles, setArticles] = useState([])
    const currentArticle = articles[articles.length - 1];
    const lien = process.env.REACT_APP_LINK_BACK

    useEffect(() => {
        actualiseArticle()
    }, [])

    function actualiseArticle() {
        getArticle()
            .then((res) => {
                setArticles(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <section className="section-article">
            {articles.length === 0 &&
                <article>
                    <p>Aucun article</p>
                </article>
            }
            {articles.length !== 0 &&
                <article>
                    <h2>ACTUALITE</h2>
                    <p>{currentArticle.titre}</p>
                    {currentArticle.imagepath &&
                        <div className="image-article-container">
                            <img src={lien + currentArticle.imagepath} alt={currentArticle.image.alt}/>
                        </div>
                    }
                    <p>{currentArticle.description}</p>
                </article>
            }
        </section>
    )
}