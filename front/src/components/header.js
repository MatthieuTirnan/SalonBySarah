import {Link} from "react-router-dom";


export const Header = () =>{

    return(
        <>
            <header>
                <h1>Le Salon By Sarah</h1>
                <nav className="nav-session">
                    {/*{!state.session.isMatch condition si connecter ou non  ?(
                        <>
                            <Link className="link-header" to="/login"> SIGN IN </Link>
                            <Link className="link-header" to="/register"> SIGN UP </Link>
                        </>

                    ):(
                        <>
                            <Link className="link-header" to="/" onClick={handleclick}> DECONNECTER </Link>

                        </>
                    )
                    }*/}
                </nav>
            </header>
            <nav className="nav-Page">
                {/*{ admin ou pas ?(
                    <>

                    </>
                ):(

                )
                }*/}
            </nav>
        </>
    )
}