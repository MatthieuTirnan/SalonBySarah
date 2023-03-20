import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {deleteMessage} from "../../helper/fetch";

export const ListMessageAdmin = () => {
    const location = useLocation();
    const currentInbox = location.state;
    const messages = currentInbox.message
    console.log(messages)
    const navigate = useNavigate()
    const state = useSelector(state => state)
    return (
        <main>
            <article>
                {messages.map((message, i) => {
                    console.log(message.src)
                    function handleClickResponse() {
                        console.log(message)
                        navigate(`/answer-message-admin`, {state: {message, currentInbox}});
                    }
                    function handleDelete() {
                        const id = message._id
                        deleteMessage(id)
                            .then((res) => {
                                console.log(res)
                                navigate(-1)
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
                            <div>
                                {message.from === state.user._id ? (
                                    <>
                                        <p>message de : {state.user.pseudo}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>message de : {currentInbox.user.pseudo}</p>
                                        <button onClick={handleClickResponse}>REPONDRE</button>
                                        <button onClick={handleDelete}>SUPPRIMER</button>
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