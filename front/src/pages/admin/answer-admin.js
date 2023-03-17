import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {postAnswerMessage} from "../../helper/fetch";

export const AnswerMessageAdmin = () => {
    const location = useLocation();
    const currentMessage = location.state.message;
    const currentInbox = location.state.currentInbox.user
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})
    const titre = currentMessage.titre
    const user = currentMessage.from
    const navigate = useNavigate()

    function handleSubmit(e) {

        e.preventDefault()
        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("fichier", fichier);
        formData.append("user", user);
        console.log("ok")

        postAnswerMessage(formData)
            .then((res) => {
                console.log(res)
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
                navigate(-1)
            })
    }

    return (
        <main>
            <section>
                <p>{currentMessage.titre}</p>
                <p>{currentMessage.description}</p>
                {currentMessage.src &&
                    <div className="image-message-container">
                        <img src={currentMessage.src} alt={currentMessage.alt}/>
                    </div>
                }
                <div>
                    <p>message de : {currentInbox.pseudo}</p>


                </div>
            </section>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>répondre au message</legend>

                    <label>Contenu de votre message </label>
                    <textarea onChange={(e) => setDescription(e.target.value)} name="description"></textarea>

                    <label htmlFor="fichier">ajouter une image</label>
                    <input onChange={(e) => setFichier(e.target.files[0])} type="file" name="fichier"/>


                    <button type="submit">ENVOYER</button>
                </fieldset>
            </form>
        </main>
    )
}