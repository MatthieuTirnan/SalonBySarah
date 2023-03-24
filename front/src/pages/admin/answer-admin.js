import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {postAnswerMessage} from "../../helper/fetch";
import '../../asset/style/message-admin.scss'
import {toastError, toastSuccess} from "../../components/toast/toast";
import {ToastContainer} from "react-toastify";

export const AnswerMessageAdmin = () => {
    const location = useLocation();
    const currentMessage = location.state.message;
    const currentInbox = location.state.currentInbox.user
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})
    const titre = currentMessage.titre
    const user = currentMessage.from
    const navigate = useNavigate()
    const inboxParam = location.state.currentInbox
    const lien =process.env.REACT_APP_LINK_BACK

    function handleSubmit(e) {

        e.preventDefault()
        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("fichier", fichier);
        formData.append("user", user);

        postAnswerMessage(formData)
            .then((res) => {

                if (res.message === "champ manquant") {
                    toastError("champ manquant")
                } else if (res.message === 'Unsupported image file type') {
                    toastError("Unsupported image file type")
                } else {
                    toastSuccess(`le message ${res.message.titre} a bien été ajouté`)
                }
                navigate(-2)
            })
            .catch((err) => {
                console.log(err)
                navigate(-2)
            })
    }

    return (
        <main>
            <section className="previous-message">
                <p>{currentMessage.titre}</p>
                <p>{currentMessage.description}</p>
                {currentMessage.src &&
                    <div className="image-message-container-answer">
                        <img src={lien+currentMessage.src} alt={currentMessage.alt}/>
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