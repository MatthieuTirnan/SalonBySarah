import {useDispatch, useSelector} from "react-redux";
import "../asset/style/header.scss"
import {Link} from "react-router-dom";
import {user} from "../store/slices/userSlice";
import {useState} from "react";

export const Header = () => {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        } else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    const state = useSelector(state => state)
    const dispatch = useDispatch()




    function handleclick() {
        localStorage.clear()
        dispatch(user({
            pseudo: "",
            email: "",
            isAdmin: false,
            _id: "",
            jwt: "",
            isMatch: false
        }))
    }

    return (
        <>
            <header>
                <h1>Le Salon By Sarah</h1>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </header>
            <nav className="nav-header">
                <div className={menu_class}>
                    {!state.user.isMatch ? (
                        < div className="lien">
                            <Link className="link-header" to="/login"> CONNEXION </Link>
                            <Link className="link-header" to="/register"> CREER UN COMPTE </Link>
                        </div>
                    ) : (
                        <div className="lien">
                            <Link className="link-header" to="/" onClick={handleclick}> DECONNECTER </Link>
                            {!state.user.isAdmin &&
                                <Link className="link-header" to="/message"> MESSAGE </Link>
                            }
                        </div>
                    )
                    }
                    {state.user.isAdmin &&
                        <div className="lien">
                            <Link className="link-header" to="/dashboard"> DASHBOARD </Link>
                            <Link className="link-header" to="/inbox-admin">MESSAGE ADMIN</Link>
                        </div>
                    }
                    <div className="lien">
                        <Link className="link-header" to="/"> ACCUEIL </Link>
                        <Link className="link-header" to="/galerie"> GALERIE </Link>
                        <Link className="link-header" to="/article"> ARTICLE </Link>
                        <Link className="link-header" to="/tarif"> PRESTATION </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}