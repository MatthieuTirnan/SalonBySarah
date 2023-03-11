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

function App() {
    return (
        <>
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
                    <Route path="/article" element={<Article/>}/>
                    <Route path="/galerie" element={<Galerie/>}/>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
