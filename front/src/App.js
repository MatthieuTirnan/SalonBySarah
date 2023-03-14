import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/général/home";
import {Login} from "./pages/général/login";
import {Register} from "./pages/général/register";
import {Tarif} from "./pages/général/tarif";
import {Message} from "./pages/logged/message";
import {MessageAdmin} from "./pages/admin/message-admin";
import {UserManagement} from "./pages/admin/user-management";
import {Article} from "./pages/général/article";
import {Galerie} from "./pages/général/galerie";
import {Header} from "./components/header";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAminUser, getAuth, getUser} from "./helper/fetch";
import {user} from "./store/slices/userSlice";
import {PrestationManagement} from "./pages/admin/prestation-management";
import {Dashboard} from "./pages/général/dashbord";
import {listAdmin} from "./store/slices/listAdminSlice";
import {listUsers} from "./store/slices/listUserSlice";

function App() {

    const state = useSelector(state => state)
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

        if (!state.listAdmin) {

            getAminUser()
                .then((res) => {
                    dispatch(listAdmin(res))
                })
                .catch((err) => {
                    console.log(err)
                })
        }


    }, [])

    return (<>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/tarif" element={<Tarif/>}/>
                <Route path="/message" element={<Message/>}/>
                <Route path="/message-admin" element={<MessageAdmin/>}/>
                <Route path="/user-management" element={<UserManagement/>}/>
                <Route path="/prestation-management" element={<PrestationManagement/>}/>
                <Route path="/article" element={<Article/>}/>
                <Route path="/galerie" element={<Galerie/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </>);
}

export default App;
