import {useEffect, useState} from "react";
import {deleteMessage, getUserMessage, postMessageUser} from "../../helper/fetch";
import { useSelector} from "react-redux";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastError, toastSuccess} from "../../components/toast/toast";

export const Message = () => {
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})
    const [userMessages, setUserMessages] = useState(["en chargement"])
    const [user,setUser]=useState("")
    const state = useSelector(state => state)
    const lien =process.env.REACT_APP_LINK_BACK

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

                if (res.message === "champ manquant") {
                    toastSuccess("champ manquant")
                    return <ToastContainer/>
                } else if (res.message === 'Unsupported image file type') {
                    toastSuccess("Unsupported image file type")
                    return <ToastContainer/>
                } else {
                    toastSuccess(`le message  a bien été ajouté`)
                    getMessages()

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
                            console.log(id,user)
                            deleteMessage(id,user)
                                .then((res) => {
                                    toastSuccess("message supprimé")
                                    getMessages()
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
                                        <img src={lien+message.src} alt={message.alt}/>
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