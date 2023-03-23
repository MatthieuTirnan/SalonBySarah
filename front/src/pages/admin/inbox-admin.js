import {useEffect, useState} from "react";
import {getInboxAdmin, getlistUser} from "../../helper/fetch";
import {useDispatch, useSelector} from "react-redux";
import {listUsers} from "../../store/slices/listUserSlice";
import {useNavigate} from "react-router-dom";
import "../../asset/style/inbox.scss"

export const InboxAdmin = () => {

    const navigate = useNavigate()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [inboxs, setInboxs] = useState([])

    useEffect(() => {
        inboxDisplay()




    }, [])



    function inboxDisplay() {
        getInboxAdmin()
            .then((res) => {
                setInboxs(res.inbox)
                getlistUser()
                    .then((res) => {
                        dispatch(listUsers(res.user))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (<main>
        <article className="inbox-container">
            {!inboxs  ? (
                <div>Aucun Messages</div>
            ) : (
                inboxs.slice(0).reverse().map((inbox, i) => {

                    function handleClick() {
                        navigate(`/message-admin`, {state: inbox});
                    }

                    return (<section key={i}>
                        <p>{inbox.user.pseudo}</p>
                        <button onClick={handleClick}>VOIR MESSAGES</button>
                    </section>)
                })

            )}
        </article>
    </main>)
}