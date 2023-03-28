import {useEffect, useState} from "react";
import {deleteMessage, getUserMessage, postMessageUser} from "../../helper/fetch";
import {useSelector} from "react-redux";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastError, toastSuccess} from "../../components/toast/toast";
import {useNavigate} from "react-router-dom";

export const Message = () => {

    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})
    const [userMessages, setUserMessages] = useState(["en chargement"])
    const [user, setUser] = useState("")
    const state = useSelector(state => state)
    const lien = process.env.REACT_APP_LINK_BACK
    const navigate = useNavigate()

    useEffect(() => {
        getMessages()
    }, [])


    function getMessages() {
        getUserMessage()
            .then((res) => {
                setUser(res.inbox.user._id)
                setUserMessages(res.inbox.message)
            })
            .catch((err) => {
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("fichier", fichier);


        postMessageUser(formData)
            .then((res) => {
                if (res.message === 'fichier manquant') {
                    toastError(res.message)
                } else if (res.message === 'Unsupported image file type') {
                    toastError(res.message)
                } else {
                    toastSuccess("le message a bien été ajouté")
                }
            })
            .catch((err) => {
                toastError(err.message)
            })
    }

    return (
        <main>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Ajouter un message</legend>
                    <label htmlFor="titre">TITRE</label>
                    <input onChange={(e) => setTitre(e.target.value)} type="text" id="titre" name="titre"/>

                    <label>Contenu de votre message </label>
                    <textarea onChange={(e) => setDescription(e.target.value)} name="description"></textarea>

                    <label htmlFor="fichier">ajouter une image</label>
                    <input onChange={(e) => setFichier(e.target.files[0])} type="file" name="fichier"/>

                    <button type="submit">ENVOYER</button>
                </fieldset>
            </form>

            <article>
                {userMessages[0] === "en chargement" ? (
                    <div>Aucun Message</div>
                ) : (
                    userMessages.map((message, i) => {
                        function handleDelete() {
                            const id = message._id
                            console.log(id, user)
                            deleteMessage(id, user)
                                .then((res) => {
                                    toastSuccess("message supprimé")
                                    getMessages()
                                    navigate('/')
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }

                        return (
                            <section key={i}>
                                <p>{message.titre}</p>
                                <p>{message.description}</p>
                                {message.src &&
                                    <div className="image-message-container">
                                        <img src={lien + message.src} alt={message.alt}/>
                                    </div>
                                }
                                {message.from === state.user._id ? (
                                    <p>message de : {state.user.pseudo}</p>
                                ) : (
                                    <p>réponse d'un admin</p>
                                )
                                }
                                <button onClick={handleDelete}>SUPPRIMER</button>
                            </section>
                        )
                    })
                )
                }
            </article>
        </main>
    )
}