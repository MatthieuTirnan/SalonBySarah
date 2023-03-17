import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const ListMessageAdmin = () => {
    const location = useLocation();
    const currentInbox = location.state;
    console.log(currentInbox)
    const messages = currentInbox.message
    console.log(messages)
    const state = useSelector(state => state)
    return (
        <main>
            <article>
                {messages.map((message, i) => {
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

                                    <> {currentInbox.user.pseudo}</>
                                )

                                }
                            </p>
                        </section>
                    )
                })
                }
            </article>
        </main>
    )
}