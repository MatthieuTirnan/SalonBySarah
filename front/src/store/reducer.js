import {combineReducers} from "redux";
import prestationSlice from "./slices/prestation.js";
import listAdminSlice from "./slices/listAdminSlice.js";
import listUsersSlice from "./slices/listUserSlice.js";
import userSlice from "./slices/userSlice.js";

//import reducer from 'chemin/reducer'


const rootReducer = combineReducers({
    //nomDuState: reducer
    user: userSlice,
    prestation: prestationSlice,
    listAdmin: listAdminSlice,
    listUsers: listUsersSlice,

})


export default rootReducer