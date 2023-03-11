import {useNavigate} from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()


        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit} method="POST">
            <fieldset>
                <legend> Créer un compte  </legend>
                <label>Pseudo : </label>
                <input type="text"
                       placeholder="pseudo"
                       name="pseudo" >
                </input>

                <label>Email : </label>
                <input type="email"
                       placeholder="EMAIL"
                       name="email" >
                </input>

                <label>Mot de passe : </label>
                <input type="password"
                       placeholder="password"
                       name="password"
                       required>
                </input>

                <button type="submit" name="ENVOYE">ENVOYER</button>
            </fieldset>
        </form>
    )
}