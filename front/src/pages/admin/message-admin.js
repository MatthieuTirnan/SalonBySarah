import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {deleteMessage} from "../../helper/fetch";
import '../../asset/style/message-admin.scss'
import {toastSuccess} from "../../components/toast/toast";

export const ListMessageAdmin = () => {

    const location = useLocation();
    const currentInbox = location.state;
    const messages = currentInbox.message
    const lien = process.env.REACT_APP_LINK_BACK
    const navigate = useNavigate()
    const state = useSelector(state => state)

    return (
        <main>
            <article className="message-container">
                {messages.map((message, i) => {
                    function handleClickResponse() {
                        navigate(`/answer-message-admin`, {state: {message, currentInbox}});
                    }

                    function handleDelete() {
                        const id = message._id
                        const user = currentInbox.user._id
                        deleteMessage(id, user)
                            .then((res) => {
                                toastSuccess("message supprimé")
                                navigate(-1)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }

                    return (
                        <section key={i}
                                 className={message.from === state.user._id ? "border-admin message-user-wrapper" : "border-user message-user-wrapper"}>
                            <h2>{message.titre}</h2>
                            <p>{message.description}</p>
                            {message.src &&
                                <div className="image-message-container">
                                    <img src={lien + message.src} alt={message.alt}/>
                                </div>
                            }
                            <div>
                                {message.from === state.user._id ? (
                                    <>
                                        <p>message de : {state.user.pseudo}</p>
                                        <button className="admin-button" onClick={handleDelete}>SUPPRIMER</button>
                                    </>
                                ) : (
                                    <>
                                        <p>message de : {currentInbox.user.pseudo}</p>
                                        <button className="user-button" onClick={handleClickResponse}>REPONDRE</button>
                                        <button className="user-button" onClick={handleDelete}>SUPPRIMER</button>
                                    </>
                                )
                                }
                            </div>
                        </section>
                    )
                })
                }
            </article>
        </main>
    )
}