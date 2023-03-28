import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/header";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAuth} from "./helper/fetch";
import {user} from "./store/slices/userSlice";
import {Footer} from "./components/footer";
import {Toast} from "./components/toast/toast";
import {AuthMiddleware} from "./middleware/authmiddleware";
import {adminRoutes, publicRoutes, privateRoutes} from "./middleware/route";
import {AdminMiddleware} from "./middleware/adminmiddleware";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            getAuth()
                .then((res) => {
                    dispatch(user({
                        pseudo: res.user.pseudo,
                        isAdmin: res.user.isAdmin,
                        isMatch: res.isMatch,
                        email: res.user.email,
                        _id: res.user.id
                    }))
                })
                .catch((err) => {
                    console.log(err)
                    localStorage.removeItem('jwt')
                })
        }
    }, [])


    return (
        <>
            <BrowserRouter>
                <Header/>
                <Toast/>
                <Routes>
                    {publicRoutes.map((route, i) => (
                        <Route path={route.path} element={route.component} key={i} exact={true}/>
                    ))}

                    {privateRoutes.map((route, idx) => (
                        <Route path={route.path} element={
                            <AuthMiddleware>
                                {route.component}
                            </AuthMiddleware>}
                               key={idx}
                               exact={true}
                        />
                    ))}

                    {adminRoutes.map((route, i) => (
                        <Route path={route.path} element={
                            <AdminMiddleware>
                                {route.component}
                            </AdminMiddleware>}
                               key={i}
                               exact={true}
                        />
                    ))}
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;
