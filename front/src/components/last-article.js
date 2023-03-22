import {useEffect, useState} from "react";
import {getArticle} from "../helper/fetch";
export const LastArticle = () => {
const [articles, setArticles] = useState([])
const currentArticle = articles[articles.length -1];
useEffect(() => {
    actualiseArticle()
}, [])
useEffect(()=>{
    console.log(articles)
    console.log(currentArticle)
},[articles])
function actualiseArticle() {
    getArticle()
        .then((res) => {
            setArticles(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

return(
    <section className="section-article">
        {articles.length !== 0 &&
            <article >
                <h2>ACTUALITE</h2>
                <p>{currentArticle.titre}</p>
                {currentArticle.imagepath &&
                    <div className="image-article-container">
                        <img src={currentArticle.imagepath} alt={currentArticle.image.alt}/>
                    </div>
                }
                <p>{currentArticle.description}</p>
            </article>

        }
    </section>
)
}