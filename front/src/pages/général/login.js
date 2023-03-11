import {useNavigate} from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()


        navigate("/")
    }
    return (
        <form onSubmit={handleSubmit} method="POST">
            <fieldset>
                <legend> Se Connecter</legend>
                <label>Email : </label>
                <input type="email" placeholder="EMAIL" name="email" ></input>
                <label>Mot de passe : </label>
                <input type="password" placeholder="password"
                       name="password" required></input>
                <button type="submit" name="ENVOYE">ENVOYER</button>
            </fieldset>
        </form>
    )
}