import {Navigate} from "react-router-dom";
import {toastError} from "../components/toast/toast";

export const AuthMiddleware = (props) => {

    if (!localStorage.getItem("jwt")) {
        toastError("nécessite d'être connecté ")
        return (
            <Navigate to={"/login"}/>
        );
    }
    return (
        <>
            {props.children}
        </>
    );
};