import {combineReducers} from "redux";

import articleSLice from "./slices/articlesSlice.js";
import prestationSlice from "./slices/prestation.js";
import listAdminSlice from "./slices/listAdminSlice.js";
import listUsersSlice from "./slices/listUserSlice.js";
import inboxSlice from "./slices/inboxSlice.js";
import userSlice from "./slices/userSlice.js";

//import reducer from 'chemin/reducer'


const rootReducer = combineReducers({
    //nomDuState: reducer
    user: userSlice,
    article: articleSLice,
    prestation: prestationSlice,
    listAdmin: listAdminSlice,
    listUsers: listUsersSlice,
    inbox: inboxSlice
})


export default rootReducer