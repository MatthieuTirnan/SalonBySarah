import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/général/home";
import {Login} from "./pages/général/login";
import {Register} from "./pages/général/register";
import {Tarif} from "./pages/général/tarif";
import {Message} from "./pages/logged/message";
import {InboxAdmin} from "./pages/admin/inbox-admin";
import {UserManagement} from "./pages/admin/user-management";
import {Article} from "./pages/général/article";
import {Galerie} from "./pages/général/galerie";
import {Header} from "./components/header";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAuth} from "./helper/fetch";
import {user} from "./store/slices/userSlice";
import {PrestationManagement} from "./pages/admin/prestation-management";
import {Dashboard} from "./pages/général/dashbord";

import {ArticleManagement} from "./pages/admin/article-admin";
import {ListMessageAdmin} from "./pages/admin/message-admin";
import {AnswerMessageAdmin} from "./pages/admin/answer-admin";
import {Footer} from "./components/footer";


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


    return (<>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/tarif" element={<Tarif/>}/>
                <Route path="/message" element={<Message/>}/>
                <Route path="/inbox-admin" element={<InboxAdmin/>}/>
                <Route path="/user-management" element={<UserManagement/>}/>
                <Route path="/prestation-management" element={<PrestationManagement/>}/>
                <Route path="/article" element={<Article/>}/>
                <Route path="/galerie" element={<Galerie/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/article-management" element={<ArticleManagement/>}/>
                <Route path="/message-admin" element={<ListMessageAdmin/>}/>
                <Route path="/answer-message-admin" element={<AnswerMessageAdmin/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>);
}

export default App;
