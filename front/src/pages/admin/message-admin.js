import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ListMessageAdmin = () => {
    const location = useLocation();
    const currentInbox = location.state;
    const messages = currentInbox.message
    const navigate = useNavigate()
    const state = useSelector(state => state)
    return (
        <main>
            <article>
                {messages.map((message, i) => {
                    console.log(message.src)

                    function handleClickReponse() {
                        console.log(message)
                        navigate(`/answer-message-admin`, {state: {message, currentInbox}});
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
                                <p>message de : </p>
                                {message.from === state.user._id ? (
                                    <>
                                        <p> {state.user.pseudo}</p>
                                    </>
                                ) : (
                                    <>
                                        <p> {currentInbox.user.pseudo}</p>
                                        <button onClick={handleClickReponse}>REPONDRE</button>
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