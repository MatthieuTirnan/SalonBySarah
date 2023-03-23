
import {InboxAdmin} from "../pages/admin/inbox-admin";
import {UserManagement} from "../pages/admin/user-management";
import {PrestationManagement} from "../pages/admin/prestation-management";
import {Dashboard} from "../pages/général/dashbord";
import {ArticleManagement} from "../pages/admin/article-admin";
import {ListMessageAdmin} from "../pages/admin/message-admin";
import {AnswerMessageAdmin} from "../pages/admin/answer-admin";
import {Login} from "../pages/général/login";
import {Register} from "../pages/général/register";
import {Home} from "../pages/général/home";
import {Article} from "../pages/général/article";
import {Galerie} from "../pages/général/galerie";
import {Tarif} from "../pages/général/tarif";
import {Message} from "../pages/logged/message";

export const adminRoutes = [

    { path:"/inbox-admin", component:<InboxAdmin/>},
    { path:"/user-management", component:<UserManagement/>},
    { path:"/prestation-management", component:<PrestationManagement/>},
    { path:"/dashboard", component:<Dashboard/>},
    { path:"/article-management", component:<ArticleManagement/>},
    { path:"/message-admin", component:<ListMessageAdmin/>},
    { path:"/answer-message-admin", component:<AnswerMessageAdmin/>}
]

export const publicRoutes =[
    {path:"/login", component:<Login/>},
    {path:"/register", component:<Register/>},
    {path:"/", component:<Home/>},
    {path:"/article", component:<Article/>},
    {path:"/galerie", component:<Galerie/>},
    {path:"/tarif", component:<Tarif/>}

]
export const privateRoutes =[
    {path:"/message", component:<Message/>},

]
