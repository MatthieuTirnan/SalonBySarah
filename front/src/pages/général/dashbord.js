import {Link} from "react-router-dom";

export const Dashboard = () => {

    return (
        <>
            <Link to="/message-admin"> Voir les messages </Link>
            <Link to="/user-management"> User </Link>
            <Link to="/prestation-management"> Prestation </Link>
        </>
    )
}