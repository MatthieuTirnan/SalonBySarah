import {useNavigate} from "react-router-dom";
import '../../asset/style/login.scss'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {postLogin} from "../../helper/fetch";
import {user} from "../../store/slices/userSlice";

export const Login = () => {
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        postLogin(email, password)
            .then(res => {
                alert(res.message)
                dispatch(user({
                    isMatch: res.isMatch,
                    jwt: res.jwt,
                    pseudo: res.user.pseudo,
                    isAdmin: res.user.isAdmin,
                    email: res.user.email,
                    _id: res.user._id
                }))
                localStorage.setItem("jwt", res.jwt)
            })
            .catch(err => {
                console.log(err);

            });
        navigate("/")
    }

    return (
        <main>
            <form onSubmit={handleSubmit} method="POST">
                <fieldset>
                    <legend> Se Connecter</legend>
                    <label>Email : </label>
                    <input
                        type="email"
                        placeholder="EMAIL"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <label>Mot de passe : </label>
                    <input type="password"
                           placeholder="password"
                           name="password"
                           onChange={(e) => setPassword(e.target.value)}
                           required></input>
                    <button type="submit" name="ENVOYE">ENVOYER</button>
                </fieldset>
            </form>
        </main>
    )
}