import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const AdminMiddleware = (props) => {

    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.user)


    useEffect(() => {
        if (!user.isMatch) {
            setLoaded(false)
        } else {
            setLoaded(true)
        }
    }, [user])

    if (!localStorage.getItem("jwt")) {
        return (
            <Navigate to={"/login"}/>
        );
    }
    switch (loaded) {
        case true: {
            if (user.isAdmin) {
                return props.children
            }
            return <Navigate to={"/login"}/>
        }
        case false: {
            return <h1>Loading</h1>
        }
        default: return <h1>Loading</h1>
    }

};