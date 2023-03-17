import {useEffect, useState} from "react";
import {deleteUser, getUserMessage, postMessageUser} from "../../helper/fetch";
import {useSelector} from "react-redux";

export const Message = () => {
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [fichier, setFichier] = useState({})
    const [userMessages, setUserMessages] = useState([])
    const state = useSelector(state => state)

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        console.log(userMessages)
    }, [userMessages])

    function getMessages() {
        getUserMessage()
            .then((res) => {

                setUserMessages(res.inbox.message)
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
        console.log("ok")

        postMessageUser(formData)
            .then((res) => {
                console.log(res)
                if (res.message === "champ manquant") {
                    alert("champ manquant")
                } else if (res.message === 'Unsupported image file type') {
                    alert("Unsupported image file type")
                } else {
                    alert(`le message ${res.message.titre} a bien été ajouté`)
                }
                getMessages()
            })
            .catch((err) => {
                alert(err.message)
                console.log(err)
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
                {userMessages.map((message, i) => {
                    function displayUser(message) {
                        const user = state.listAdmin.adminUser.find(u => u._id === message.from)
                        console.log(user)
                        return user.pseudo
                    }

                    function handleDelete() {
                        const id = message._id
                        deleteUser(id)
                            .then((res) => {
                                alert(`${message.titre} supprimé`)
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
                                    <img src={message.src} alt={message.alt}/>
                                </div>
                            }
                            <p>message de :
                                {message.from === state.user._id ? (
                                    <> {state.user.pseudo}</>
                                ) : (

                                    <> {displayUser(message)}</>
                                )

                                }
                            </p>
                            <button onClick={handleDelete}>SUPPRIMER</button>
                        </section>
                    )
                })
                }
            </article>
        </main>
    )
}