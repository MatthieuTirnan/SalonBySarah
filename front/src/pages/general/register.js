import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../../asset/style/login.scss'
import {useState} from 'react';
import {postRegister} from "../../helper/fetch";
import {user} from "../../store/slices/userSlice";
import {toastError} from "../../components/toast/toast";

export const Register = () => {

    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()

        postRegister(pseudo, email, password)
            .then(res => {
                console.log(res)
                localStorage.setItem("jwt", res.jwt)
                dispatch(user({
                    isMatch: res.isMatch,
                    jwt: res.jwt,
                    pseudo: res.user.pseudo,
                    isAdmin: res.user.isAdmin,
                    email: res.user.email,
                    _id: res.user._id
                }))
            })
            .catch((err) => {
                toastError("un champ et manquant ou mal renseigner")
                console.log(err)
            })
        navigate("/")
    }

    return (
        <main>
            <form onSubmit={handleSubmit} method="POST">
                <fieldset>
                    <legend> Créer un compte</legend>
                    <label>Pseudo : </label>
                    <input type="text"
                           onChange={(e) => setPseudo(e.target.value)}
                           placeholder="pseudo"
                           name="pseudo">
                    </input>

                    <label>Email : </label>
                    <input type="email"
                           placeholder="EMAIL"
                           onChange={(e) => setEmail(e.target.value)}
                           name="email">
                    </input>

                    <label>Mot de passe : </label>
                    <input type="password"
                           placeholder="password"
                           name="password"
                           onChange={(e) => setPassword(e.target.value)}
                           required>
                    </input>

                    <button type="submit" name="ENVOYE">ENVOYER</button>
                </fieldset>
            </form>
        </main>
    )
}