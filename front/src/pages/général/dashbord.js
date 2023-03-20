import {Link} from "react-router-dom";
import "../../asset/style/dashboard.scss"

export const Dashboard = () => {

    return (
        <main>
            <Link to="/user-management"> User </Link>
            <Link to="/prestation-management"> Prestation </Link>
        </main>
    )
}